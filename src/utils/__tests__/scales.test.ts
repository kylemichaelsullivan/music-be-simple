import { describe, expect, it } from 'vitest';
import { generateNotesFromIntervals } from '../scales';

describe('scales utilities', () => {
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

		it('should wrap around correctly for scales starting near the end', () => {
			// B major starting at index 11
			const result = generateNotesFromIntervals(11, 'major');
			// Should wrap around: B=11, C#=1, D#=3, E=4, F#=6, G#=8, A#=10
			expect(result).toEqual([11, 1, 3, 4, 6, 8, 10]);
		});
	});
});
