import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Der Ordner heißt auf GitHub "Public" (großes P) — Vite ausdrücklich darauf hinweisen,
  // damit Icons, Manifest und Service Worker in den fertigen Build kopiert werden.
  publicDir: "Public",
});
