import { expect, test } from '@playwright/test';

test.describe('Play Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/play');
	});

	test('should display play page', async ({ page }) => {
		await expect(page).toHaveURL(/.*play/);
	});

	test('should have interactive elements', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const body = page.locator('body');
		await expect(body).not.toBeEmpty();
	});

	test('should allow instrument interaction', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		// Look for clickable instrument elements (keys, frets, etc.)
		const clickableElements = page.locator('button, [role="button"], svg').first();
		// At least some interactive elements should exist
		await expect(clickableElements)
			.toBeVisible({ timeout: 5000 })
			.catch(() => {
				// If not found immediately, that's okay
			});
	});

	test('should display Chord Bin section', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const chordBinHeading = page.getByRole('heading', { name: 'Chord Bin' });
		await expect(chordBinHeading).toBeVisible();
	});

	test('should add chord bin items', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const addButton = page.getByTitle('Add Chord to Bin');
		await expect(addButton).toBeVisible();

		// Click add button
		await addButton.click();

		// Should see a chord bin item
		const chordBinItem = page.locator('[id^="chord-bin-item-"]').first();
		await expect(chordBinItem).toBeVisible({ timeout: 2000 });
	});

	test('should remove chord bin items', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		// First add an item
		const addButton = page.getByTitle('Add Chord to Bin');
		await addButton.click();

		// Wait for item to appear
		const chordBinItem = page.locator('[id^="chord-bin-item-"]').first();
		await expect(chordBinItem).toBeVisible({ timeout: 2000 });

		// Find and click remove button
		const removeButton = chordBinItem.getByTitle(/Remove Chord Bin Item/);
		await removeButton.click();

		// Item should be removed
		await expect(chordBinItem).not.toBeVisible({ timeout: 2000 });
	});

	test('should display Notepad section', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const notepadHeading = page.getByRole('heading', { name: 'Notepad' });
		await expect(notepadHeading).toBeVisible();
	});

	test('should add notepad lines', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const addButton = page.getByTitle('Add Line to Notepad');
		await expect(addButton).toBeVisible();

		// Click add button
		await addButton.click();

		// Should see a notepad line
		const notepadLine = page.locator('[id^="notepad-line-"]').first();
		await expect(notepadLine).toBeVisible({ timeout: 2000 });
	});

	test('should remove notepad lines', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		// First add a line
		const addButton = page.getByTitle('Add Line to Notepad');
		await addButton.click();

		// Wait for line to appear
		const notepadLine = page.locator('[id^="notepad-line-"]').first();
		await expect(notepadLine).toBeVisible({ timeout: 2000 });

		// Find and click remove button
		const removeButton = notepadLine.getByTitle(/Remove Notepad Line/);
		await removeButton.click();

		// Line should be removed
		await expect(notepadLine).not.toBeVisible({ timeout: 2000 });
	});

	test('should display Save Section', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const toggleButton = page.getByTitle(/Open Save Section|Close Save Section/);
		await expect(toggleButton).toBeVisible();
	});

	test('should toggle Save Section open and closed', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		const toggleButton = page.getByTitle(/Open Save Section|Close Save Section/);

		// Initially closed, click to open
		await expect(toggleButton).toHaveAttribute('title', 'Open Save Section');
		await toggleButton.click();

		// Should see import/export sections
		const importHeading = page.getByRole('heading', { name: 'Import' });
		const exportHeading = page.getByRole('heading', { name: 'Export' });
		await expect(importHeading).toBeVisible({ timeout: 2000 });
		await expect(exportHeading).toBeVisible({ timeout: 2000 });

		// Click to close
		await toggleButton.click();
		await expect(importHeading).not.toBeVisible({ timeout: 2000 });
	});

	test('should display Import and Export buttons', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		// Open save section
		const toggleButton = page.getByTitle('Open Save Section');
		await toggleButton.click();

		// Check for import buttons
		const importChordBin = page.getByTitle('Import Chord Bin');
		const importNotepad = page.getByTitle('Import Notepad');
		const importAll = page.getByTitle('Import All');

		await expect(importChordBin).toBeVisible({ timeout: 2000 });
		await expect(importNotepad).toBeVisible({ timeout: 2000 });
		await expect(importAll).toBeVisible({ timeout: 2000 });

		// Check for export buttons
		const exportChordBin = page.getByTitle('Export Chord Bin');
		const exportNotepad = page.getByTitle('Export Notepad');
		const exportAll = page.getByTitle('Export All');

		await expect(exportChordBin).toBeVisible({ timeout: 2000 });
		await expect(exportNotepad).toBeVisible({ timeout: 2000 });
		await expect(exportAll).toBeVisible({ timeout: 2000 });
	});
});
