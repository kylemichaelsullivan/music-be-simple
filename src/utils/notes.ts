import type { NoteIndex, ScaleType } from '@/types';

export const FLATS = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'] as const;

export const SHARPS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] as const;

export const FREQUENCIES = [
	261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88,
] as const;

export const INTERVALS = {
	major: [1, 1, 0.5, 1, 1, 1],
	minor: [1, 0.5, 1, 1, 0.5, 1],
	pentatonic: [1, 1, 1.5, 1],
	ionian: [1, 1, 0.5, 1, 1, 1],
	dorian: [1, 0.5, 1, 1, 1, 0.5],
	phrygian: [0.5, 1, 1, 1, 0.5, 1],
	lydian: [1, 1, 1, 0.5, 1, 1],
	mixolydian: [1, 1, 0.5, 1, 1, 0.5],
	aeolian: [1, 0.5, 1, 1, 0.5, 1],
	locrian: [0.5, 1, 1, 0.5, 1, 1],
} as const;

export type IntervalKey = keyof typeof INTERVALS;

function getIntervalKeys(): IntervalKey[] {
	const keys = Object.keys(INTERVALS);
	return keys.filter((key) => key in INTERVALS) as IntervalKey[];
}

export const SCALE_TYPES: readonly IntervalKey[] = getIntervalKeys();

export function getIntervals(key: IntervalKey): readonly number[] {
	return INTERVALS[key];
}

function isIntervalKey(variant: IntervalKey) {
	return variant in INTERVALS;
}

export function getIntervalsForVariant(variant: IntervalKey) {
	if (isIntervalKey(variant)) {
		return INTERVALS[variant];
	}
	return INTERVALS.major;
}

export function rangeOfLength(length: number): readonly number[] {
	return Array.from({ length }, (_, i) => i);
}

export type Notes_Flats = (typeof FLATS)[number];
export type Notes_Sharps = (typeof SHARPS)[number];

export function getNote(note: NoteIndex, usingFlats: boolean): string {
	const scale = usingFlats ? FLATS : SHARPS;
	return scale[note];
}

export function isValidNoteIndex(value: number): value is NoteIndex {
	return value >= 0 && value <= 11;
}

export function isValidScaleType(value: string): value is ScaleType {
	return value in INTERVALS;
}

/*
 *  0: C
 *  1: C♯/D♭
 *  2: D
 *  3: D♯/E♭
 *  4: E
 *  5: F
 *  6: F♯/G♭
 *  7: G
 *  8: G♯/A♭
 *  9: A
 * 10: A♯/B♭
 * 11: B
 */
