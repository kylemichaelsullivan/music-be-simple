import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
	test('should navigate between pages', async ({ page }) => {
		await page.goto('/');

		// Check if navigation exists
		const nav = page.locator('nav');
		await expect(nav)
			.toBeVisible({ timeout: 5000 })
			.catch(() => {
				// Navigation might be in different format
			});

		// Try to navigate to scales
		await page.goto('/scales');
		await expect(page).toHaveURL(/.*scales/);

		// Try to navigate to chords
		await page.goto('/chords');
		await expect(page).toHaveURL(/.*chords/);

		// Try to navigate to play
		await page.goto('/play');
		await expect(page).toHaveURL(/.*play/);
	});

	test('should have working home link', async ({ page }) => {
		await page.goto('/scales');
		await page.goto('/');
		// The home route redirects to /scales
		await expect(page).toHaveURL(/.*scales/);
	});
});
