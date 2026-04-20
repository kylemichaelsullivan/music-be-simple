import { expect, test } from '@playwright/test';

test.describe('Play Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/play');
		await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible({
			timeout: 20_000,
		});
	});

	test('should display play page', async ({ page }) => {
		await expect(page).toHaveURL(/.*\/play/);
	});

	test('should show Coming Soon placeholder', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible();
	});
});
