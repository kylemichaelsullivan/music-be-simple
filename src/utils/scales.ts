import type { NoteIndex, ScaleType } from '@/types';
import { getIntervalsForVariant, isValidNoteIndex } from './notes';

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
