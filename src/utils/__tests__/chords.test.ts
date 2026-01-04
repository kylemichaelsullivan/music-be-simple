import { describe, expect, it } from 'vitest';
import {
	generateChordNotes,
	getChordGroups,
	getChordInfo,
	getChordSymbol,
	getChordVariants,
} from '../chords';
import type { Chord_Variant } from '../chords';

describe('chords utilities', () => {
	describe('getChordInfo', () => {
		it('should return major chord info', () => {
			const info = getChordInfo('major');
			expect(info.display).toBe('Major');
			expect(info.intervals).toHaveLength(2);
			expect(info.symbols).toEqual(['M', 'M']);
		});

		it('should return minor chord info', () => {
			const info = getChordInfo('minor');
			expect(info.display).toBe('Minor');
			expect(info.symbols).toEqual(['m', '–']);
		});

		it('should return dominant-7 chord info', () => {
			const info = getChordInfo('dominant-7');
			expect(info.display).toBe('Dominant 7');
			expect(info.intervals).toHaveLength(3);
		});

		it('should handle normalized variant names', () => {
			const info = getChordInfo('dominant7' as Chord_Variant);
			expect(info.display).toBe('Dominant 7');
		});

		it('should default to major for unknown variant', () => {
			const info = getChordInfo('unknown-variant' as Chord_Variant);
			expect(info.display).toBe('Major');
		});
	});

	describe('getChordSymbol', () => {
		it('should return nerd symbol when isNerdMode is true', () => {
			expect(getChordSymbol('major', true)).toBe('M');
			expect(getChordSymbol('minor', true)).toBe('m');
			expect(getChordSymbol('dominant-7', true)).toBe('7');
		});

		it('should return jazz symbol when isNerdMode is false', () => {
			expect(getChordSymbol('major', false)).toBe('M');
			expect(getChordSymbol('minor', false)).toBe('–');
			expect(getChordSymbol('dominant-7', false)).toBe('7');
		});
	});

	describe('getChordGroups', () => {
		it('should return all chord groups', () => {
			const groups = getChordGroups();
			expect(groups).toContain('Simple Triads');
			expect(groups).toContain('Seventh Chords');
			expect(groups.length).toBeGreaterThan(0);
		});
	});

	describe('getChordVariants', () => {
		it('should return variants for Simple Triads', () => {
			const variants = getChordVariants('Simple Triads');
			expect(variants).toContain('major');
			expect(variants).toContain('minor');
			expect(variants).toContain('power-chord');
		});

		it('should return variants for Seventh Chords', () => {
			const variants = getChordVariants('Seventh Chords');
			expect(variants).toContain('major-7');
			expect(variants).toContain('dominant-7');
			expect(variants).toContain('minor-7');
		});
	});

	describe('generateChordNotes', () => {
		it('should generate C major chord notes', () => {
			// C major: C (0), E (4), G (7)
			const notes = generateChordNotes(0, 'major');
			expect(notes).toContain(0); // C
			expect(notes).toContain(4); // E
			expect(notes).toContain(7); // G
		});

		it('should generate A minor chord notes', () => {
			// A minor: A (9), C (0), E (4)
			const notes = generateChordNotes(9, 'minor');
			expect(notes).toContain(9); // A
			expect(notes).toContain(0); // C
			expect(notes).toContain(4); // E
		});

		it('should generate dominant-7 chord notes', () => {
			// C7: C (0), E (4), G (7), Bb (10)
			const notes = generateChordNotes(0, 'dominant-7');
			expect(notes).toContain(0); // C
			expect(notes).toContain(4); // E
			expect(notes).toContain(7); // G
			expect(notes).toContain(10); // Bb
		});

		it('should wrap around correctly for chords starting near the end', () => {
			// B major: B (11), D# (3), F# (6)
			const notes = generateChordNotes(11, 'major');
			expect(notes).toContain(11); // B
			expect(notes).toContain(3); // D#
			expect(notes).toContain(6); // F#
		});
	});
});
