import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    root: "./tests",
    environment: "node",
    coverage: {
        provider: "v8",
    }
  }
})