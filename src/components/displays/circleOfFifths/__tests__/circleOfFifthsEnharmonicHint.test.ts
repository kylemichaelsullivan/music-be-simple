import { describe, expect, it } from 'vitest';
import { circleOfFifthsEnharmonicHintText } from '../circleOfFifthsEnharmonicHint';

describe('circleOfFifthsEnharmonicHintText', () => {
	it('when sharps are selected, suggests flat spellings with fewer accidentals', () => {
		const t = circleOfFifthsEnharmonicHintText(false);
		expect(t).toContain('Try using flats for fewer sharps');
		expect(t).toContain('A♯ (2♭)');
		expect(t).toContain('D♯ (3♭)');
		expect(t).toContain('G♯ (4♭)');
		expect(t).toContain('C♯ (5♭)');
		expect(t).toContain('F♯ (6♭)');
	});

	it('when flats are selected, suggests sharp spellings for the sharp side', () => {
		const t = circleOfFifthsEnharmonicHintText(true);
		expect(t).toContain('Try using sharps for fewer flats');
		expect(t).toContain('G (1♯)');
		expect(t).toContain('D (2♯)');
		expect(t).toContain('A (3♯)');
		expect(t).toContain('E (4♯)');
		expect(t).toContain('B (5♯)');
	});
});
