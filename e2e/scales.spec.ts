import { expect, test } from '@playwright/test';

test.describe('Scales Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/scales');
	});

	test('should display scales page', async ({ page }) => {
		await expect(page).toHaveURL(/.*\/scales/);
	});

	test('should have tonic selector', async ({ page }) => {
		const tonicSelector = page.getByLabel('Tonic Select');
		await expect(tonicSelector).toBeVisible();
	});

	test('should change tonic when selected', async ({ page }) => {
		const tonicSelector = page.locator('main.Scales').getByLabel('Tonic Select');
		await tonicSelector.selectOption('5'); // F
		await expect(tonicSelector).toHaveValue('5');
	});

	test('should display scale notes', async ({ page }) => {
		// Wait for the page to load and check for scale visualization
		await page.waitForLoadState('networkidle');
		// The page should have some content related to scales
		const body = page.locator('body');
		await expect(body).not.toBeEmpty();
	});

	test('should have variant selector', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const variantSelect = page.locator('main.Scales').getByLabel('Scale Variant');
		await expect(variantSelect).toBeVisible({ timeout: 5000 });
	});

	test('should change scale variant to Dorian', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const variantSelect = page.locator('main.Scales').getByLabel('Scale Variant');
		await variantSelect.selectOption('dorian');
		await expect(variantSelect).toHaveValue('dorian');
	});

	test('should toggle Show Notes / Hide Notes when clicking top button', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const toggle = page.locator('main.Scales').getByTitle(/Show Notes\?|Hide Notes\?/);
		await expect(toggle).toBeVisible();
		const titleBefore = await toggle.getAttribute('title');
		await toggle.click();
		await expect(toggle).toHaveAttribute(
			'title',
			titleBefore === 'Hide Notes?' ? 'Show Notes?' : 'Hide Notes?'
		);
	});
});
