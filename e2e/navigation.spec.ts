import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
	test('should navigate between pages', async ({ page }) => {
		await page.goto('/');

		// Wait for navigation to be ready
		await page.waitForLoadState('networkidle');

		// Root route should forward to /scales
		await expect(page).toHaveURL(/.*\/scales/);

		// Check if navigation exists
		const nav = page.locator('nav');
		await expect(nav).toBeVisible({ timeout: 5000 });

		// Try to navigate to chords
		await page.goto('/chords');
		await expect(page).toHaveURL(/.*\/chords/);
		await page.waitForLoadState('networkidle');

		// Try to navigate to play
		await page.goto('/play');
		await expect(page).toHaveURL(/.*\/play/);
		await page.waitForLoadState('networkidle');

		// Try to navigate to scales
		await page.goto('/scales');
		await expect(page).toHaveURL(/.*\/scales/);
		await page.waitForLoadState('networkidle');
	});

	test('should forward root route to /scales', async ({ page }) => {
		await page.goto('/');
		// Should forward to /scales
		await expect(page).toHaveURL(/.*\/scales/);
	});

	test('should navigate using nav buttons', async ({ page }) => {
		await page.goto('/scales');
		await page.waitForLoadState('networkidle');

		const nav = page.locator('nav');
		// Use .NavTab + tab order (TABS: Scales, Chords, Play). Avoid getByTitle('Scales'):
		// preloaded off-screen tab trees can include other controls named similarly in a11y snapshots.
		const tabs = nav.locator('.NavTab');

		await tabs.nth(1).click();
		await expect(page).toHaveURL(/.*\/chords/);

		await tabs.nth(2).click();
		await expect(page).toHaveURL(/.*\/play/);

		await tabs.nth(0).click();
		await expect(page).toHaveURL(/.*\/scales/);
	});
});
