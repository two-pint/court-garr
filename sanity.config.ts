import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "court-garr",
  title: "Court Garr Blog",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
