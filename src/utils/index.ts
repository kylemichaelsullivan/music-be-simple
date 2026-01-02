import { getBorderClass } from './borders';
import {
	CHORDS,
	generateChordNotes,
	getChordGroups,
	getChordInfo,
	getChordSymbol,
	getChordVariants,
} from './chords';
import type { ChordData, ChordGroup, ChordInfo, Chord_Variant, border } from './chords';
import {
	FLATS,
	FREQUENCIES,
	INTERVALS,
	SCALE_TYPES,
	SHARPS,
	getIntervals,
	getIntervalsForVariant,
	getNote,
	isValidNoteIndex,
	rangeOfLength,
} from './notes';
import type { IntervalKey, Notes_Flats, Notes_Sharps } from './notes';
import { generateNotesFromIntervals } from './scales';

export {
	CHORDS,
	FLATS,
	FREQUENCIES,
	INTERVALS,
	SCALE_TYPES,
	SHARPS,
	generateChordNotes,
	generateNotesFromIntervals,
	getBorderClass,
	getChordGroups,
	getChordInfo,
	getChordSymbol,
	getChordVariants,
	getIntervals,
	getIntervalsForVariant,
	getNote,
	isValidNoteIndex,
	rangeOfLength,
	type Chord_Variant,
	type ChordData,
	type ChordGroup,
	type ChordInfo,
	type IntervalKey,
	type Notes_Flats,
	type Notes_Sharps,
	type border,
};
