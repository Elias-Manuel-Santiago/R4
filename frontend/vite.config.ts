import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

// Vite compila React y redirige /api al backend local durante el desarrollo.
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    proxy: {
      "/api": "http://localhost:10001",
    },
  },
});
