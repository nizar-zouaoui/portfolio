import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/dashboard",
  build: {
    outDir: "build",
  },
  plugins: [react()],

  server: {
    port: 3002,
    https:
      process.env.NODE_ENV === "production"
        ? undefined
        : {
            cert: fs.readFileSync("../../nginx/cert/localhost3000.crt"),
            key: fs.readFileSync("../../nginx/cert/localhost3000.key"),
          },
  },
  define: {
    "process.env": loadEnv(mode, process.cwd(), ""),
  },
}));
