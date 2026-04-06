import { describe, expect, it } from 'vitest';
import {
	CIRCLE_OF_FIFTHS_ORDER,
	circleInnerKeySignatureLabel,
	keySignatureMajorTonicForVariant,
	majorKeyAccidentalSigned,
	majorKeySignatureLabel,
	relativeMinorTonic,
} from '@/utils';

describe('circleOfFifths utilities', () => {
	it('should have 12 unique pitch-class indices', () => {
		expect(CIRCLE_OF_FIFTHS_ORDER).toHaveLength(12);
		expect(new Set(CIRCLE_OF_FIFTHS_ORDER).size).toBe(12);
	});

	it('should advance by perfect fifths (+7 mod 12)', () => {
		for (let i = 0; i < CIRCLE_OF_FIFTHS_ORDER.length - 1; i++) {
			const current = CIRCLE_OF_FIFTHS_ORDER[i];
			const next = CIRCLE_OF_FIFTHS_ORDER[i + 1];
			expect((current + 7) % 12).toBe(next);
		}
	});

	it('should pair major and relative minor tonics', () => {
		expect(relativeMinorTonic(0)).toBe(9);
		expect(relativeMinorTonic(7)).toBe(4);
	});

	it('should map scale variants to their major-signature tonic', () => {
		expect(keySignatureMajorTonicForVariant(9, 'minor')).toBe(0);
		expect(keySignatureMajorTonicForVariant(2, 'dorian')).toBe(0);
		expect(keySignatureMajorTonicForVariant(7, 'mixolydian')).toBe(0);
		expect(keySignatureMajorTonicForVariant(5, 'lydian')).toBe(0);
		expect(keySignatureMajorTonicForVariant(11, 'locrian')).toBe(0);
		expect(keySignatureMajorTonicForVariant(4, 'major')).toBe(4);
	});

	it('should label key signatures from pitch class and spelling preference', () => {
		expect(majorKeySignatureLabel(0, false)).toBe('—');
		expect(majorKeySignatureLabel(0, true)).toBe('—');
		expect(majorKeySignatureLabel(7, false)).toBe('1♯');
		expect(majorKeySignatureLabel(7, true)).toBe('1♯');
		expect(majorKeySignatureLabel(6, false)).toBe('6♯');
		expect(majorKeyAccidentalSigned(6, true)).toBe(-6);
		expect(majorKeySignatureLabel(6, true)).toBe('6♭');
		expect(majorKeyAccidentalSigned(1, true)).toBe(-5);
		expect(majorKeySignatureLabel(1, true)).toBe('5♭');
		expect(majorKeyAccidentalSigned(1, false)).toBe(7);
		expect(majorKeySignatureLabel(1, false)).toBe('7♯');
		expect(majorKeyAccidentalSigned(10, true)).toBe(-2);
		expect(majorKeySignatureLabel(10, true)).toBe('2♭');
		expect(majorKeyAccidentalSigned(10, false)).toBe(10);
		expect(majorKeySignatureLabel(10, false)).toBe('10♯');
	});

	it('should label the inner key-signature ring in flats mode with complement flats for sharp-side keys', () => {
		expect(circleInnerKeySignatureLabel(0, true)).toBe('—');
		expect(circleInnerKeySignatureLabel(7, true)).toBe('11♭');
		expect(circleInnerKeySignatureLabel(2, true)).toBe('10♭');
		expect(circleInnerKeySignatureLabel(9, true)).toBe('9♭');
		expect(circleInnerKeySignatureLabel(4, true)).toBe('8♭');
		expect(circleInnerKeySignatureLabel(11, true)).toBe('7♭');
		expect(circleInnerKeySignatureLabel(5, true)).toBe('1♭');
		expect(circleInnerKeySignatureLabel(10, true)).toBe('2♭');
	});

	it('should label the inner key-signature ring in sharps mode, including 11♯ for F', () => {
		expect(circleInnerKeySignatureLabel(0, false)).toBe('—');
		expect(circleInnerKeySignatureLabel(5, false)).toBe('11♯');
		expect(circleInnerKeySignatureLabel(7, false)).toBe('1♯');
		expect(circleInnerKeySignatureLabel(1, false)).toBe('7♯');
		expect(circleInnerKeySignatureLabel(8, false)).toBe('8♯');
		expect(circleInnerKeySignatureLabel(10, false)).toBe('10♯');
	});
});
