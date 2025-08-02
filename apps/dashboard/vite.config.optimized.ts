import react from "@vitejs/plugin-react";
import fs from "fs";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/dashboard",

  build: {
    outDir: "build",

    // Performance optimizations
    target: "esnext",
    minify: "terser",
    cssMinify: true,

    // Bundle optimization
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@nizar-repo/ui"],
          query: ["react-query"],
          forms: ["react-hook-form"],
          icons: ["react-icons"],
          sdk: [
            "@nizar-repo/auth-sdk",
            "@nizar-repo/categories-sdk",
            "@nizar-repo/patients-sdk",
            "@nizar-repo/medical-histories-sdk",
            "@nizar-repo/marketing-targets-sdk",
          ],
        },
        // Optimized chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split("/")
                .pop()
                ?.replace(".tsx", "")
                .replace(".ts", "")
            : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "asset";
          const info = name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `img/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },

    // Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
    },

    // Source maps only in development
    sourcemap: mode === "development",
  },

  plugins: [
    react(),
    tsconfigPaths(),

    // Bundle analyzer
    ...(process.env.ANALYZE === "true"
      ? [
          {
            name: "bundle-analyzer",
            configResolved() {
              // Add webpack bundle analyzer for Vite
              console.log("Bundle analysis will be available after build");
            },
          },
        ]
      : []),
  ],

  server: {
    port: 3002,

    // Performance settings
    fs: {
      strict: true,
    },

    // HTTPS configuration
    https:
      process.env.NODE_ENV === "production"
        ? undefined
        : {
            cert: fs.readFileSync("../../nginx/cert/localhost3000.crt"),
            key: fs.readFileSync("../../nginx/cert/localhost3000.key"),
          },
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-query",
      "react-hook-form",
      "date-fns",
    ],
    exclude: [
      // Exclude large dependencies that should be loaded on demand
    ],
  },

  // Performance enhancements
  esbuild: {
    // Drop console/debugger in production
    drop: mode === "production" ? ["console", "debugger"] : [],
  },

  define: {
    "process.env": loadEnv(mode, process.cwd(), ""),
    // Define global constants
    __DEV__: mode === "development",
  },
}));
