import react from "@vitejs/plugin-react";
import * as glob from "glob";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const patternsToIgnore = [
  "**/build/**",
  "**/coverage/**",
  "**/node_modules/**",
  "**/__test__/**",
  "**/__test__/**",
  "**/__mocks__/**",
  "**/__mocks__/**",
  "**/.turbo/**",
  "**/coverage/**",
  "**/dist/**",
  "**/*.config.js",
  "**/*.config.ts",
  "**/.env",
  "**/*.test.ts",
  "**/scripts/**",
];

const entries = glob.sync("./**/*.{ts,tsx}", {
  ignore: patternsToIgnore,
  cwd: __dirname,
  absolute: true,
});

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "build",
    target: "esnext",
    sourcemap: false,
    lib: {
      entry: {
        index: resolve(__dirname, "index.tsx"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: [
        {
          format: "cjs",
          dir: "build",
          preserveModules: true,
          preserveModulesRoot: ".",
          entryFileNames: "[name].js",
          exports: "named",
        },
        {
          format: "es",
          dir: "build",
          preserveModules: true,
          preserveModulesRoot: ".",
          entryFileNames: "[name].js",
        },
      ],
    },
  },

  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      entryRoot: ".",
      outDir: "build/@types",
      tsconfigPath: "tsconfig.json",
      exclude: patternsToIgnore,
    }),
  ],
  define: {
    "process.env": loadEnv(mode, process.cwd(), ""),
  },
}));
