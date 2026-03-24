import type { NoteIndex } from '@/types';
import { getNote, majorKeySignatureLabel } from '@/utils';

/** Pitch classes whose flat vs sharp tonic names carry different major-key signatures here. */
const ENHARMONIC_PITCH_CLASSES: readonly NoteIndex[] = [10, 3, 8, 1, 6];

/** G, D, A, E, B — major keys simpler in sharp notation when UI using flats. */
const SHARP_SIDE_SIMPLE_MAJOR_PCS: readonly NoteIndex[] = [7, 2, 9, 4, 11];

/** Hint when the UI is showing sharp spellings (usingFlats false). */
function hintWhenSharpsSelected(): string {
	const parts = ENHARMONIC_PITCH_CLASSES.map(
		(pc) => `${getNote(pc, false)} (${majorKeySignatureLabel(pc, true)})`
	);
	return `Try using flats for fewer sharps: ${parts.join(', ')}.`;
}

/** Hint when the UI is showing flat spellings (usingFlats true). */
function hintWhenFlatsSelected(): string {
	const parts = SHARP_SIDE_SIMPLE_MAJOR_PCS.map(
		(pc) => `${getNote(pc, true)} (${majorKeySignatureLabel(pc, false)})`
	);
	return `Try using sharps for fewer flats: ${parts.join(', ')}.`;
}

export function circleOfFifthsEnharmonicHintText(usingFlats: boolean): string {
	return usingFlats ? hintWhenFlatsSelected() : hintWhenSharpsSelected();
}
