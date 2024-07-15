import "dotenv/config";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  external: [],
  format: ["esm", "cjs"],
  esbuildPlugins: [],
  dts: "src/index.ts",
});
