import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173, // You will need to allow this port in your Auth0 application settings for local development
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  define: {
    "process.env": process.env,
  },
});
