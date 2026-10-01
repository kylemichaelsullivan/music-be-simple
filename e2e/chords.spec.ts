import { expect, test } from '@playwright/test';
import { LAZY_ROUTE_CONTENT_TIMEOUT_MS } from './constants';

test.describe('Chords Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('showNerdMode', 'true');
		});
		await page.goto('/chords');
		// Chords route is lazy-loaded; networkidle can settle before Suspense paints main.Chords.
		await expect(page.locator('main.Chords').getByLabel('Tonic Select')).toBeVisible({
			timeout: LAZY_ROUTE_CONTENT_TIMEOUT_MS,
		});
	});

	test('should display chords page', async ({ page }) => {
		await expect(page).toHaveURL(/.*\/chords/);
	});

	test('should have tonic selector', async ({ page }) => {
		const tonicSelector = page.locator('main.Chords').getByLabel('Tonic Select');
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
		await toggle.click({ force: true });
		await expect(toggle).toHaveAttribute(
			'title',
			titleBefore === 'Show Jazz Notation?' ? 'Show Nerd Notation?' : 'Show Jazz Notation?'
		);
	});

	test('should show chord lookup in Nerd Mode and hide it in Jazz Mode', async ({ page }) => {
		const chords = page.locator('main.Chords');
		const lookup = chords.locator('.ChordLookup');
		await expect(lookup).toBeVisible();
		await expect(lookup.getByRole('heading', { name: 'Chord lookup' })).toBeVisible();

		await chords.getByTitle('Show Jazz Notation?').click({ force: true });
		await expect(lookup).toHaveCount(0);
	});

	test('should apply a looked-up chord from selected notes', async ({ page }) => {
		const chords = page.locator('main.Chords');
		const lookup = chords.locator('.ChordLookup');
		await expect(lookup).toBeVisible();

		const keyboard = lookup.locator('.ChordLookupKeyboard');
		// Click near the bottom of white keys so overlapping black keys don’t intercept.
		for (const name of ['C', 'E', 'G'] as const) {
			const key = keyboard.getByRole('button', { name, exact: true });
			const box = await key.boundingBox();
			if (!box) {
				throw new Error(`Missing bounding box for pitch ${name}`);
			}
			await key.click({
				force: true,
				position: { x: box.width / 2, y: box.height - 8 },
			});
		}

		const firstResult = lookup.locator('.ChordLookupResult').first();
		await expect(firstResult).toBeVisible();
		await firstResult.click();

		await expect(chords.getByLabel('Tonic Select')).toHaveValue('0');
		await expect(chords.getByLabel('Chord Variant')).toHaveValue('major');
	});
});
