export { getBorderClass } from './borders';
export type {
	border,
	Chord_Variant,
	ChordData,
	ChordGroup,
	ChordInfo,
	PianoVoicingOverride,
	PianoVoicingResult,
} from './chords';
export {
	CHORDS,
	generateChordNotes,
	getChordGroups,
	getChordInfo,
	getChordSymbol,
	getChordVariants,
	getPianoBorderStyle,
	getPianoVoicing,
	isValidChordVariant,
	parseChordName,
} from './chords';
export {
	CIRCLE_OF_FIFTHS_ORDER,
	circleInnerKeySignatureLabel,
	keySignatureMajorTonicForVariant,
	majorKeyAccidentalSigned,
	majorKeySignatureLabel,
	relativeMinorTonic,
} from './circleOfFifths';
export type { IntervalKey, Notes_Flats, Notes_Sharps, ScaleData, ScaleGroup } from './notes';
export {
	FLATS,
	FREQUENCIES,
	getIntervals,
	getIntervalsForVariant,
	getNote,
	INTERVALS,
	isValidNoteIndex,
	isValidScaleType,
	rangeOfLength,
	SCALE_TYPES,
	SCALES,
	SHARPS,
} from './notes';
export {
	generateNotesFromIntervals,
	getScaleTypeDisplay,
	intervalShortNameFromTonic,
} from './scales';
