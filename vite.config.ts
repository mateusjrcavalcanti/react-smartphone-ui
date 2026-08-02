import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const pagesBase = repositoryName?.endsWith(".github.io") ? "/" : `/${repositoryName}/`;

  return {
    base: mode === "pages" && repositoryName ? pagesBase : "/",
    plugins: [react(), tailwindcss(), ...(mode === "library" ? [dts({ insertTypesEntry: true })] : [])],
    build:
      mode === "library"
        ? {
            lib: {
              entry: resolve(fileURLToPath(new URL(".", import.meta.url)), "src/index.ts"),
              formats: ["es"],
              fileName: "react-smartphone-ui",
            },
            rollupOptions: {
              external: ["react", "react-dom", "react/jsx-runtime"],
            },
          }
        : undefined,
  };
});
