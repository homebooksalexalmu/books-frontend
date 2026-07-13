import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
    resolve: {
        alias: {
            // Mirrors the `@/* -> ./src/*` alias declared in tsconfig.json so tests
            // import production code the same way the app does.
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        globals: true,
        environment: "node",
        include: ["test/**/*.test.ts"],
        setupFiles: ["./test/setup.ts"],
        coverage: {
            provider: "v8",
            reportsDirectory: "./coverage",
            reporter: ["text", "html"],
            include: ["src/backend/**/*.ts"],
            exclude: [
                "src/backend/**/dependencies.ts",
                "src/backend/**/*.schema.ts",
            ],
        },
    },
});
