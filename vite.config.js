import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    include: "**/*.svg?react",
  })],
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/main.jsx",
      },
      output: {
        format: "iife", // "iife",  Immediately-Invoked Function Expression
        name: "App", // Global variable name
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        }
      },
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
    },
    chunkSizeWarningLimit: 500,
  },
  resolve: {
    alias: {
      '@images': './src/assets',
    },
  },
});
