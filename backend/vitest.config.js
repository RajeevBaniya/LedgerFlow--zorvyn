import { config as loadEnv } from "dotenv"
import { defineConfig } from "vitest/config"

loadEnv()

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.js"],
    fileParallelism: false,
    sequence: {
      concurrent: false
    },
    testTimeout: 30_000
  }
})
