import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true, // Optional: Makes test APIs like describe, expect globally available
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"], // Path to your setup file
  },
});
