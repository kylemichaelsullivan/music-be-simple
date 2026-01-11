export { getBorderClass } from './borders';
export {
	CHORDS,
	generateChordNotes,
	getChordGroups,
	getChordInfo,
	getChordSymbol,
	getChordVariants,
	isValidChordVariant,
} from './chords';
export {
	FLATS,
	FREQUENCIES,
	INTERVALS,
	SCALE_TYPES,
	SHARPS,
	getIntervals,
	getIntervalsForVariant,
	getNote,
	isValidNoteIndex,
	isValidScaleType,
	rangeOfLength,
} from './notes';
export { generateNotesFromIntervals } from './scales';
export type { ChordData, ChordGroup, ChordInfo, Chord_Variant, border } from './chords';
export type { IntervalKey, Notes_Flats, Notes_Sharps } from './notes';
