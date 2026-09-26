import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'node:path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 * Under CI (or when PLAYWRIGHT_PORT is set), use a dedicated Vite port so E2E
 * does not reuse a stale/unrelated server already bound to 5173.
 */
const e2ePort = process.env.PLAYWRIGHT_PORT ?? (process.env.CI ? '5175' : '5173');
const e2eOrigin = `http://localhost:${e2ePort}`;

export default defineConfig({
	testDir: './e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry: CI gets 2; local gets 1 to absorb flakes when multiple workers hit one Vite dev server */
	retries: process.env.CI ? 2 : 1,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: e2eOrigin,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: `bunx vite --port ${e2ePort} --strictPort`,
		url: e2eOrigin,
		reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_PORT,
		timeout: 120 * 1000,
	},
});
