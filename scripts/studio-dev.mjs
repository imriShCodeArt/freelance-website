/**
 * Loads `.env` then `.env.local` (local overrides) before `sanity dev`.
 * Matches Next’s precedence. Plain `sanity dev` does not load these files.
 */
import { config } from "dotenv";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const envPath = resolve(root, ".env");
const envLocalPath = resolve(root, ".env.local");

config({ path: envPath });
config({ path: envLocalPath, override: true });

/* Sanity’s Vite bundle only inlines `SANITY_STUDIO_*` for the browser, not `NEXT_PUBLIC_*`. */
const nextId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const nextDs = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
if (nextId && !process.env.SANITY_STUDIO_PROJECT_ID?.trim()) {
  process.env.SANITY_STUDIO_PROJECT_ID = nextId;
}
if (nextDs && !process.env.SANITY_STUDIO_DATASET?.trim()) {
  process.env.SANITY_STUDIO_DATASET = nextDs;
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const placeholder = "placeholder-project-id";

if (!projectId || projectId === placeholder) {
  console.error(
    "[studio-dev] NEXT_PUBLIC_SANITY_PROJECT_ID is missing or still the build placeholder after loading:",
  );
  console.error(`  - ${envPath} ${existsSync(envPath) ? "(found)" : "(missing)"}`);
  console.error(`  - ${envLocalPath} ${existsSync(envLocalPath) ? "(found)" : "(missing)"}`);
  console.error(
    "[studio-dev] Use: yarn studio:dev (not `sanity dev` alone). Set the real project id in .env or .env.local.",
  );
  process.exit(1);
}

/** Run the real `sanity` entry with Node (no shell) — avoids Node DEP0190 when `shell: true`. */
const sanityBin = resolve(root, "node_modules", "sanity", "bin", "sanity");

const child = spawn(process.execPath, [sanityBin, "dev", "--port", "3333"], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
