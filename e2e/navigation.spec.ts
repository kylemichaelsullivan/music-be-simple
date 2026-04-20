import { expect, test } from '@playwright/test';
import { LAZY_ROUTE_CONTENT_TIMEOUT_MS } from './constants';

test.describe('Navigation', () => {
	test('should navigate between pages', async ({ page }) => {
		await page.goto('/');

		// Root route should forward to /scales
		await expect(page).toHaveURL(/.*\/scales/);
		await expect(page.locator('main.Scales').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});

		// Check if navigation exists
		const nav = page.locator('nav');
		await expect(nav).toBeVisible({ timeout: 5000 });

		// Try to navigate to chords
		await page.goto('/chords');
		await expect(page).toHaveURL(/.*\/chords/);
		await expect(page.locator('main.Chords').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});

		// Try to navigate to play
		await page.goto('/play');
		await expect(page).toHaveURL(/.*\/play/);
		await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});

		// Try to navigate to scales
		await page.goto('/scales');
		await expect(page).toHaveURL(/.*\/scales/);
		await expect(page.locator('main.Scales').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});
	});

	test('should forward root route to /scales', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveURL(/.*\/scales/);
		await expect(page.locator('main.Scales').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});
	});

	test('should navigate using nav buttons', async ({ page }) => {
		await page.goto('/scales');
		await expect(page.locator('main.Scales').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});

		const nav = page.getByRole('navigation');
		await nav.getByRole('button', { name: 'Chords' }).click();
		await expect(page).toHaveURL(/.*\/chords/);
		await expect(page.locator('main.Chords').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});

		await nav.getByRole('button', { name: 'Play' }).click();
		await expect(page).toHaveURL(/.*\/play/);
		await expect(page.getByRole('heading', { name: 'Coming Soon' })).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});

		await nav.getByRole('button', { name: 'Scales' }).click();
		await expect(page).toHaveURL(/.*\/scales/);
		await expect(page.locator('main.Scales').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});
	});
});
