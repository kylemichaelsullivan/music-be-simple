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

		// Click on Chords tab
		await page.getByRole('button', { name: 'Chords' }).click();
		await expect(page).toHaveURL(/.*\/chords/);

		// Click on Play tab
		await page.getByRole('button', { name: 'Play' }).click();
		await expect(page).toHaveURL(/.*\/play/);

		// Click on Scales tab
		await page.getByRole('button', { name: 'Scales' }).click();
		await expect(page).toHaveURL(/.*\/scales/);
	});
});
