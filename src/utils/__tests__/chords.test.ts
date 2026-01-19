import { describe, expect, it } from 'vitest';
import {
	generateChordNotes,
	getChordGroups,
	getChordInfo,
	getChordSymbol,
	getChordVariants,
	isValidChordVariant,
	parseChordName,
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

	describe('isValidChordVariant', () => {
		it('should return true for known variants', () => {
			expect(isValidChordVariant('major')).toBe(true);
			expect(isValidChordVariant('minor')).toBe(true);
			expect(isValidChordVariant('dominant-7')).toBe(true);
			expect(isValidChordVariant('diminished')).toBe(true);
		});

		it('should return false for unknown variants', () => {
			expect(isValidChordVariant('unknown')).toBe(false);
			expect(isValidChordVariant('')).toBe(false);
		});
	});

	describe('parseChordName', () => {
		it('should return null tonic and variant for empty or whitespace input', () => {
			expect(parseChordName('', true)).toEqual({ tonic: null, variant: null });
			expect(parseChordName('   ', false)).toEqual({ tonic: null, variant: null });
		});

		it('should parse note only as major (usingFlats)', () => {
			expect(parseChordName('C', true)).toEqual({ tonic: 0, variant: 'major' });
			expect(parseChordName('D♭', true)).toEqual({ tonic: 1, variant: 'major' });
			expect(parseChordName('G', true)).toEqual({ tonic: 7, variant: 'major' });
		});

		it('should parse note only as major (usingSharps)', () => {
			expect(parseChordName('C', false)).toEqual({ tonic: 0, variant: 'major' });
			// C♯: 'C' matches first, remaining '♯' has no variant match → major
			expect(parseChordName('C♯', false)).toEqual({ tonic: 0, variant: 'major' });
		});

		it('should parse note with variant symbol', () => {
			// 'A–' uses jazz symbol for minor; 'm' matches major's 'M' first
			expect(parseChordName('A–', true)).toEqual({ tonic: 9, variant: 'minor' });
			expect(parseChordName('C–', false)).toEqual({ tonic: 0, variant: 'minor' });
		});

		it('should default to major when variant cannot be matched', () => {
			const r = parseChordName('Cxyz', true);
			expect(r.tonic).toBe(0);
			expect(r.variant).toBe('major');
		});

		it('should return null when note cannot be parsed', () => {
			expect(parseChordName('Z', true)).toEqual({ tonic: null, variant: null });
			expect(parseChordName('Xm', false)).toEqual({ tonic: null, variant: null });
		});
	});
});
