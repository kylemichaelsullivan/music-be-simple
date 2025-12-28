import type { NoteIndex } from '@/types';
import { getIntervalsForVariant } from './notes';

/**
 * Generates an array of note indices from a tonic and variant (scale/chord pattern)
 * @param tonic The starting note index (0-11)
 * @param variant The scale or chord variant (e.g., 'major', 'minor')
 * @returns Array of note indices representing the scale/chord
 */
export function generateNotesFromIntervals(tonic: NoteIndex, variant: string): NoteIndex[] {
	const intervals = getIntervalsForVariant(variant);
	const scaleNotes: NoteIndex[] = [tonic];
	let currentNote = tonic;

	for (const interval of intervals) {
		currentNote = (currentNote + interval * 2) % 12;
		scaleNotes.push(currentNote);
	}

	return scaleNotes;
}
