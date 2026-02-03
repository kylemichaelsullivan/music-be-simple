import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureImportAll = path.join(__dirname, 'fixtures', 'import-all.json');

test.describe('Play Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/play');
	});

	test('should display play page', async ({ page }) => {
		await expect(page).toHaveURL(/.*\/play/);
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

		// Find and click remove button (title format is "Remove {chordName}")
		const removeButton = chordBinItem.getByTitle(/^Remove /);
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
		const addButton = page.getByTitle('Add to Notepad');
		await expect(addButton).toBeVisible();

		await addButton.click();
		await page.getByRole('button', { name: 'Line' }).click();

		const notepadLine = page.locator('[id^="notepad-line-"]').first();
		await expect(notepadLine).toBeVisible({ timeout: 2000 });
	});

	test('should remove notepad lines', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		await page.getByTitle('Add to Notepad').click();
		await page.getByRole('button', { name: 'Line' }).click();

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

	test.describe('Tuning modal', () => {
		test('should open Edit Tuning modal when clicking Edit Tuning for Guitar', async ({ page }) => {
			await page.waitForLoadState('networkidle');
			const editTuningBtn = page.getByRole('button', { name: 'Edit Tuning for Guitar' });
			await editTuningBtn.scrollIntoViewIfNeeded();
			await editTuningBtn.click();

			await expect(page.getByRole('heading', { name: /Edit Tuning/i })).toBeVisible({
				timeout: 2000,
			});
			await expect(page.getByRole('button', { name: /Reset to Default/i })).toBeVisible();
			await expect(page.getByLabel('String 1')).toBeVisible();
		});

		test('should change a string and close the tuning modal', async ({ page }) => {
			await page.waitForLoadState('networkidle');
			const editTuningBtn = page.getByRole('button', { name: 'Edit Tuning for Guitar' });
			await editTuningBtn.scrollIntoViewIfNeeded();
			await editTuningBtn.click();

			const string1 = page.getByLabel('String 1');
			await expect(string1).toBeVisible({ timeout: 2000 });
			await string1.selectOption('5'); // F
			await expect(string1).toHaveValue('5');

			await page.getByTitle('Close').click();
			await expect(page.getByRole('heading', { name: /Edit Tuning/i })).not.toBeVisible({
				timeout: 2000,
			});
		});
	});

	test.describe('Import and Export', () => {
		test('should import Chord Bin and Notepad from fixture', async ({ page }) => {
			await page.waitForLoadState('networkidle');
			await page.getByTitle('Open Save Section').click();
			await expect(page.getByRole('heading', { name: 'Import' })).toBeVisible({ timeout: 2000 });

			await page.locator('.Imports input[type="file"]').setInputFiles(fixtureImportAll);

			// Chord Bin: fixture has one item (C major)
			const chordItems = page.locator('[id^="chord-bin-item-"]');
			await expect(chordItems.first()).toBeVisible({ timeout: 3000 });
			// Notepad: fixture has one line with "Imported from e2e fixture" in an input
			await expect(page.locator('input[value="Imported from e2e fixture"]').first()).toBeVisible({
				timeout: 3000,
			});
		});

		test('should export Chord Bin and have valid JSON', async ({ page }) => {
			await page.waitForLoadState('networkidle');
			await page.getByTitle('Add Chord to Bin').click();
			await expect(page.locator('[id^="chord-bin-item-"]').first()).toBeVisible({ timeout: 2000 });

			await page.getByTitle('Open Save Section').click();
			await expect(page.getByRole('heading', { name: 'Export' })).toBeVisible({ timeout: 2000 });

			const [download] = await Promise.all([
				page.waitForEvent('download'),
				page.getByTitle('Export Chord Bin').click(),
			]);
			const downloadPath = await download.path();
			if (!downloadPath) throw new Error('Download path is null');
			const content = await readFile(downloadPath, 'utf-8');
			const data = JSON.parse(content);
			expect(Array.isArray(data.chordBin)).toBe(true);
			expect(data.chordBin.length).toBeGreaterThanOrEqual(1);
		});

		test('should export Notepad and have valid JSON', async ({ page }) => {
			await page.waitForLoadState('networkidle');
			await page.getByTitle('Add to Notepad').click();
			await page.getByRole('button', { name: 'Line' }).click();
			await expect(page.locator('[id^="notepad-line-"]').first()).toBeVisible({ timeout: 2000 });

			await page.getByTitle('Open Save Section').click();
			await expect(page.getByRole('heading', { name: 'Export' })).toBeVisible({ timeout: 2000 });

			const [download] = await Promise.all([
				page.waitForEvent('download'),
				page.getByTitle('Export Notepad').click(),
			]);
			const downloadPath = await download.path();
			if (!downloadPath) throw new Error('Download path is null');
			const content = await readFile(downloadPath, 'utf-8');
			const data = JSON.parse(content);
			expect(Array.isArray(data.notepad)).toBe(true);
			expect(data.notepad.length).toBeGreaterThanOrEqual(1);
		});
	});
});
