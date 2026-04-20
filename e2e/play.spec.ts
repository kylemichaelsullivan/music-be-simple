import { expect, test } from '@playwright/test';
import { LAZY_ROUTE_CONTENT_TIMEOUT_MS } from './constants';

test.describe('Play Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/play');
		await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});
	});

	test('should display play page', async ({ page }) => {
		await expect(page).toHaveURL(/.*\/play/);
	});

	test('should show Coming Soon placeholder', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible();
	});
});
