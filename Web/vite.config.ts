import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        // Matches WebBaseUrl in the Service's PunchoutConfigs.
        port: 3000,
    },
    build: {
        outDir: "build",
    },
});
