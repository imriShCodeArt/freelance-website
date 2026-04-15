import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, getSanityDataset, getSanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Freelance website",
  /** Must match `src/app/studio/[[...index]]` so desk URLs are `/studio/...`, not `/structure/...` (404 on Next). */
  basePath: "/studio",
  projectId: getSanityProjectId(),
  dataset: getSanityDataset(),
  apiVersion,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
