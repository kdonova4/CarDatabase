import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    server: {
      deps: {
        inline: ["@mui/x-data-grid"],
      }
    }
  },
})