import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/main.jsx",
      },
      output: {
        format: "iife",
        name: "App",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "assets/[name].[ext]",
      },
    }
  },
  resolve: {
    alias: {
      '@images': './src/assets',
    },
  },
});