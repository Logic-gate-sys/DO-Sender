import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Only include tests inside test/unit-test/
    include: ['test/unit-test/**/*.test.{ts,js}'],

    // Ignore e2e/synpress/playwright/etc.
    exclude: [
      'test/e2e/**',
      'test/wallet-setup/**',
      'tests/**', // if you also have a plural "tests" dir
      'node_modules/**',
      'dist/**',
    ],
  },
});
