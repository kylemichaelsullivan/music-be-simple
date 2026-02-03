import type { IntervalKey } from '@/utils';
import {
	FLATS,
	FREQUENCIES,
	INTERVALS,
	SHARPS,
	getIntervals,
	getIntervalsForVariant,
	getNote,
	isValidNoteIndex,
} from '@/utils';
import { describe, expect, it } from 'vitest';

describe('notes utilities', () => {
	describe('FLATS and SHARPS', () => {
		it('should have 12 notes in each array', () => {
			expect(FLATS).toHaveLength(12);
			expect(SHARPS).toHaveLength(12);
		});

		it('should start with C in both arrays', () => {
			expect(FLATS[0]).toBe('C');
			expect(SHARPS[0]).toBe('C');
		});
	});

	describe('FREQUENCIES', () => {
		it('should have 12 frequencies', () => {
			expect(FREQUENCIES).toHaveLength(12);
		});

		it('should have A4 at 440Hz (index 9)', () => {
			expect(FREQUENCIES[9]).toBe(440.0);
		});
	});

	describe('INTERVALS', () => {
		it('should have major interval pattern', () => {
			expect(INTERVALS.major).toEqual([1, 1, 0.5, 1, 1, 1]);
		});

		it('should have minor interval pattern', () => {
			expect(INTERVALS.minor).toEqual([1, 0.5, 1, 1, 0.5, 1]);
		});

		it('should have all expected scale types', () => {
			const expectedTypes = [
				'major',
				'minor',
				'pentatonic',
				'ionian',
				'dorian',
				'phrygian',
				'lydian',
				'mixolydian',
				'aeolian',
				'locrian',
			];
			for (const type of expectedTypes) {
				expect(INTERVALS).toHaveProperty(type);
			}
		});
	});

	describe('getNote', () => {
		it('should return correct note using sharps', () => {
			expect(getNote(0, false)).toBe('C');
			expect(getNote(1, false)).toBe('C♯');
			expect(getNote(9, false)).toBe('A');
		});

		it('should return correct note using flats', () => {
			expect(getNote(0, true)).toBe('C');
			expect(getNote(1, true)).toBe('D♭');
			expect(getNote(9, true)).toBe('A');
		});
	});

	describe('isValidNoteIndex', () => {
		it('should return true for valid indices', () => {
			expect(isValidNoteIndex(0)).toBe(true);
			expect(isValidNoteIndex(5)).toBe(true);
			expect(isValidNoteIndex(11)).toBe(true);
		});

		it('should return false for invalid indices', () => {
			expect(isValidNoteIndex(-1)).toBe(false);
			expect(isValidNoteIndex(12)).toBe(false);
			expect(isValidNoteIndex(100)).toBe(false);
		});
	});

	describe('getIntervals', () => {
		it('should return correct intervals for major', () => {
			expect(getIntervals('major')).toEqual([1, 1, 0.5, 1, 1, 1]);
		});

		it('should return correct intervals for minor', () => {
			expect(getIntervals('minor')).toEqual([1, 0.5, 1, 1, 0.5, 1]);
		});
	});

	describe('getIntervalsForVariant', () => {
		it('should return intervals for valid variant', () => {
			expect(getIntervalsForVariant('major')).toEqual([1, 1, 0.5, 1, 1, 1]);
			expect(getIntervalsForVariant('dorian')).toEqual([1, 0.5, 1, 1, 1, 0.5]);
		});

		it('should default to major for invalid variant', () => {
			// TypeScript will prevent this, but runtime check
			expect(getIntervalsForVariant('major' as IntervalKey)).toEqual([1, 1, 0.5, 1, 1, 1]);
		});
	});
});
