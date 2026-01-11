import { expect, test } from '@playwright/test';

test.describe('Chords Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/chords');
	});

	test('should display chords page', async ({ page }) => {
		await expect(page).toHaveURL(/.*chords/);
	});

	test('should have tonic selector', async ({ page }) => {
		const tonicSelector = page.getByLabel('Tonic Select');
		await expect(tonicSelector).toBeVisible();
	});

	test('should change tonic when selected', async ({ page }) => {
		const tonicSelector = page.getByLabel('Tonic Select');
		await tonicSelector.selectOption('7'); // G
		await expect(tonicSelector).toHaveValue('7');
	});

	test('should display chord information', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const body = page.locator('body');
		await expect(body).not.toBeEmpty();
	});
});
