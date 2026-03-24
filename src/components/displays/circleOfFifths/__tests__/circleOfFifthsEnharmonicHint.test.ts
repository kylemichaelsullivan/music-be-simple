import { describe, expect, it } from 'vitest';
import { circleOfFifthsEnharmonicHintText } from '../circleOfFifthsEnharmonicHint';

describe('circleOfFifthsEnharmonicHintText', () => {
	it('when sharps are selected for locrian, sorts flat suggestions by ascending accidental count', () => {
		const t = circleOfFifthsEnharmonicHintText(false, 'locrian');
		expect(t).toBe('Try using flats for fewer sharps: E (1♭), A (2♭), D (3♭), G (4♭), C (5♭).');
	});

	it('when sharps are selected for major, keeps ascending flat-order regardless of tonic', () => {
		const t = circleOfFifthsEnharmonicHintText(false, 'major');
		expect(t).toBe(
			'Try using flats for fewer sharps: F (1♭), A♯ (2♭), D♯ (3♭), G♯ (4♭), C♯ (5♭).'
		);
	});

	it('when flats are selected for major, suggests sharp spellings over 6 accidentals', () => {
		const t = circleOfFifthsEnharmonicHintText(true, 'major');
		expect(t).toContain('Try using sharps for fewer flats');
		expect(t).toContain('G (1♯)');
		expect(t).toContain('D (2♯)');
		expect(t).toContain('A (3♯)');
		expect(t).toContain('E (4♯)');
		expect(t).toContain('B (5♯)');
	});
});
