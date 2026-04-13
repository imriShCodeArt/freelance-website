import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, getSanityDataset, getSanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Freelance website",
  projectId: getSanityProjectId(),
  dataset: getSanityDataset(),
  apiVersion,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
