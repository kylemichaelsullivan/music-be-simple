import { describe, expect, it } from 'vitest';
import {
	generateNotesFromIntervals,
	getScaleTypeDisplay,
	intervalShortNameFromTonic,
} from '@/utils';

describe('scales utilities', () => {
	it('should resolve scale type display labels', () => {
		expect(getScaleTypeDisplay('major')).toBe('Major');
		expect(getScaleTypeDisplay('dorian')).toBe('Dorian');
		expect(getScaleTypeDisplay('bebop-dominant')).toBe('Bebop Dominant');
	});

	it('should name chromatic intervals from a tonic', () => {
		expect(intervalShortNameFromTonic(0, 0)).toBe('1');
		expect(intervalShortNameFromTonic(0, 4)).toBe('M3');
		expect(intervalShortNameFromTonic(9, 0)).toBe('m3');
	});

	describe('generateNotesFromIntervals', () => {
		it('should generate C major scale correctly', () => {
			// C major: C, D, E, F, G, A, B, C
			// Intervals: 1, 1, 0.5, 1, 1, 1 (whole, whole, half, whole, whole, whole)
			const result = generateNotesFromIntervals(0, 'major');
			// C=0, D=2, E=4, F=5, G=7, A=9, B=11, C=0
			expect(result).toEqual([0, 2, 4, 5, 7, 9, 11]);
		});

		it('should generate A minor scale correctly', () => {
			// A minor: A, B, C, D, E, F, G, A
			// Intervals: 1, 0.5, 1, 1, 0.5, 1
			const result = generateNotesFromIntervals(9, 'minor');
			// A=9, B=11, C=0, D=2, E=4, F=5, G=7
			expect(result).toEqual([9, 11, 0, 2, 4, 5, 7]);
		});

		it('should generate G major scale correctly', () => {
			// G major: G, A, B, C, D, E, F#, G
			const result = generateNotesFromIntervals(7, 'major');
			// G=7, A=9, B=11, C=0, D=2, E=4, F#=6
			expect(result).toEqual([7, 9, 11, 0, 2, 4, 6]);
		});

		it('should handle pentatonic scale', () => {
			// Pentatonic intervals: 1, 1, 1.5, 1
			const result = generateNotesFromIntervals(0, 'pentatonic');
			// C=0, D=2, E=4, G=7, A=9
			expect(result).toEqual([0, 2, 4, 7, 9]);
		});

		it('should generate C bebop dominant (1 2 3 4 5 6 ♭7 7)', () => {
			const result = generateNotesFromIntervals(0, 'bebop-dominant');
			// C, D, E, F, G, A, B♭, B
			expect(result).toEqual([0, 2, 4, 5, 7, 9, 10, 11]);
		});

		it('should wrap around correctly for scales starting near the end', () => {
			// B major starting at index 11
			const result = generateNotesFromIntervals(11, 'major');
			// Should wrap around: B=11, C#=1, D#=3, E=4, F#=6, G#=8, A#=10
			expect(result).toEqual([11, 1, 3, 4, 6, 8, 10]);
		});
	});
});
