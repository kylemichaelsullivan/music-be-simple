import type { NoteIndex, ScaleType } from '@/types';
import { SCALES, getIntervalsForVariant, isValidNoteIndex } from './notes';

/** Short chromatic interval from tonic up to each pitch class (12-edo, within octave). */
const CHROMATIC_INTERVAL_SHORT: readonly string[] = [
	'1',
	'm2',
	'M2',
	'm3',
	'M3',
	'P4',
	'TT',
	'P5',
	'm6',
	'M6',
	'm7',
	'M7',
];

export function intervalShortNameFromTonic(tonic: NoteIndex, pitchClass: NoteIndex): string {
	const d = (pitchClass - tonic + 12) % 12;
	return CHROMATIC_INTERVAL_SHORT[d];
}

export function getScaleTypeDisplay(variant: ScaleType): string {
	for (const group of Object.values(SCALES)) {
		if (variant in group) {
			return group[variant as keyof typeof group].display;
		}
	}
	return variant;
}

export function generateNotesFromIntervals(tonic: NoteIndex, variant: ScaleType): NoteIndex[] {
	const intervals = getIntervalsForVariant(variant);
	const scaleNotes: NoteIndex[] = [tonic];
	let currentNote = tonic;

	for (const interval of intervals) {
		const nextNote = (currentNote + interval * 2) % 12;
		if (!isValidNoteIndex(nextNote)) {
			throw new Error(`Invalid note index: ${nextNote}`);
		}
		currentNote = nextNote;
		scaleNotes.push(currentNote);
	}

	return scaleNotes;
}
