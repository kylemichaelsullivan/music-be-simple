import { expect, test } from '@playwright/test';

test.describe('Chords Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/chords');
	});

	test('should display chords page', async ({ page }) => {
		await expect(page).toHaveURL(/.*\/chords/);
	});

	test('should have tonic selector', async ({ page }) => {
		const tonicSelector = page.getByLabel('Tonic Select');
		await expect(tonicSelector).toBeVisible();
	});

	test('should change tonic when selected', async ({ page }) => {
		const tonicSelector = page.locator('main.Chords').getByLabel('Tonic Select');
		await tonicSelector.selectOption('7'); // G
		await expect(tonicSelector).toHaveValue('7');
	});

	test('should display chord information', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const body = page.locator('body');
		await expect(body).not.toBeEmpty();
	});

	test('should change chord variant to minor', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const variantSelect = page.locator('main.Chords').getByLabel('Chord Variant');
		await variantSelect.selectOption('minor');
		await expect(variantSelect).toHaveValue('minor');
	});

	test('should toggle Nerd/Jazz notation when clicking top button', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const toggle = page
			.locator('main.Chords')
			.getByTitle(/Show Jazz Notation\?|Show Nerd Notation\?/);
		await expect(toggle).toBeVisible();
		const titleBefore = await toggle.getAttribute('title');
		await toggle.click();
		await expect(toggle).toHaveAttribute(
			'title',
			titleBefore === 'Show Jazz Notation?' ? 'Show Nerd Notation?' : 'Show Jazz Notation?'
		);
	});
});
