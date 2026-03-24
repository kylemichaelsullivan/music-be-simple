import type { NoteIndex, ScaleType } from '@/types';
import {
	CIRCLE_OF_FIFTHS_ORDER,
	circleInnerKeySignatureLabel,
	getNote,
	keySignatureMajorTonicForVariant,
	majorKeyAccidentalSigned,
	majorKeySignatureLabel,
} from '@/utils';

const MAX_PRACTICAL_ACCIDENTALS = 6;

function highAccidentalTonicHints(usingFlats: boolean, variant: ScaleType): string[] {
	const suggestedModeUsesFlats = !usingFlats;
	const hintData = CIRCLE_OF_FIFTHS_ORDER.map((tonic: NoteIndex, circleIndex) => {
		const signatureMajorTonic = keySignatureMajorTonicForVariant(tonic, variant);
		const innerLabel = circleInnerKeySignatureLabel(signatureMajorTonic, usingFlats);
		const currentAccidentalCount = innerLabel === '—' ? 0 : Number.parseInt(innerLabel, 10);
		const altSigned = majorKeyAccidentalSigned(signatureMajorTonic, suggestedModeUsesFlats);
		const altAccidentalCount = Math.abs(altSigned);

		return {
			tonic,
			circleIndex,
			currentAccidentalCount,
			altAccidentalCount,
			altLabel: majorKeySignatureLabel(signatureMajorTonic, suggestedModeUsesFlats),
		};
	});

	return hintData
		.filter((item) => item.currentAccidentalCount > MAX_PRACTICAL_ACCIDENTALS)
		.sort((a, b) => a.altAccidentalCount - b.altAccidentalCount || a.circleIndex - b.circleIndex)
		.map((item) => `${getNote(item.tonic, usingFlats)} (${item.altLabel})`);
}

export function circleOfFifthsEnharmonicHintText(usingFlats: boolean, variant: ScaleType): string {
	const parts = highAccidentalTonicHints(usingFlats, variant);

	return usingFlats
		? `Try using sharps for fewer flats: ${parts.join(', ')}.`
		: `Try using flats for fewer sharps: ${parts.join(', ')}.`;
}
