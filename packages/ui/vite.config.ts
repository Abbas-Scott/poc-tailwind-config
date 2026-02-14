import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@workspace/ui": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        postcss: "./postcss.config.mjs",
    },
    server: {
        port: 3001,
        open: true,
    },
});
