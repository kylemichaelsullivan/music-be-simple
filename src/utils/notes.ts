import type { NoteIndex, ScaleType } from '@/types';

export const FLATS = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'] as const;

export const SHARPS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] as const;

export const FREQUENCIES = [
	261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88,
] as const;

export const INTERVALS = {
	// Common Scales
	major: [1, 1, 0.5, 1, 1, 1],
	minor: [1, 0.5, 1, 1, 0.5, 1],
	pentatonic: [1, 1, 1.5, 1],
	// Modes (major scale modes)
	lydian: [1, 1, 1, 0.5, 1, 1],
	ionian: [1, 1, 0.5, 1, 1, 1],
	mixolydian: [1, 1, 0.5, 1, 1, 0.5],
	dorian: [1, 0.5, 1, 1, 1, 0.5],
	aeolian: [1, 0.5, 1, 1, 0.5, 1],
	phrygian: [0.5, 1, 1, 1, 0.5, 1],
	locrian: [0.5, 1, 1, 0.5, 1, 1],
	// Melodic Minor Modes
	'lydian-sharp-5': [1, 1, 1, 1, 0.5, 1],
	'lydian-dominant': [1, 1, 1, 0.5, 1, 0.5],
	'melodic-minor': [1, 0.5, 1, 1, 1, 1],
	'dorian-flat-2': [0.5, 1, 1, 1, 1, 0.5],
	'mixolydian-flat-6': [1, 1, 0.5, 1, 0.5, 1],
	'locrian-sharp-2': [1, 0.5, 1, 0.5, 1, 1],
	altered: [0.5, 1, 0.5, 1, 1, 1],
	// Harmonic Minor Modes
	'ionian-sharp-5': [1, 1, 0.5, 1.5, 0.5, 1],
	'harmonic-minor': [1, 0.5, 1, 1, 0.5, 1.5],
	'phrygian-dominant': [0.5, 1.5, 0.5, 1, 0.5, 1],
	'lydian-sharp-2': [1.5, 0.5, 1, 0.5, 1, 1],
	'locrian-sharp-2-harmonic': [1, 0.5, 1, 1, 0.5, 1],
	'dorian-sharp-4': [1, 0.5, 1.5, 0.5, 1, 0.5],
	'locrian-sharp-6': [0.5, 1, 1, 0.5, 1.5, 0.5],
	'super-locrian': [0.5, 1, 0.5, 1, 1, 0.5],
	// Blues & Pentatonic
	'minor-blues': [1.5, 1, 0.5, 0.5, 1.5],
	'major-blues': [1, 0.5, 0.5, 1.5, 1],
	'minor-pentatonic': [1.5, 1, 1, 1.5],
	'dominant-pentatonic': [2, 0.5, 1, 1.5],
	// Others
	'harmonic-major': [1, 1, 0.5, 1, 0.5, 1.5],
	'double-harmonic-minor': [0.5, 1.5, 0.5, 1, 0.5, 1.5],
	'hungarian-minor': [1, 0.5, 1.5, 0.5, 0.5, 1.5],
	'whole-tone': [1, 1, 1, 1, 1],
	'half-whole-diminished': [0.5, 1, 0.5, 1, 0.5, 1, 0.5],
	'whole-half-diminished': [1, 0.5, 1, 0.5, 1, 0.5, 1],
} as const;

export type IntervalKey = keyof typeof INTERVALS;

export type ScaleData = {
	display: string;
};

export type ScaleGroup = Record<string, ScaleData>;

/** Scale variants grouped by section for the dropdown (like CHORDS). */
export const SCALES: Record<string, ScaleGroup> = {
	'Common Scales': {
		major: { display: 'Major' },
		minor: { display: 'Minor' },
	},
	'Modes of the Major Scale': {
		lydian: { display: 'Lydian' },
		ionian: { display: 'Ionian' },
		mixolydian: { display: 'Mixolydian' },
		dorian: { display: 'Dorian' },
		aeolian: { display: 'Aeolian' },
		phrygian: { display: 'Phrygian' },
		locrian: { display: 'Locrian' },
	},
	'Modes of the Melodic Minor': {
		'melodic-minor': { display: 'Melodic Minor' },
		'dorian-flat-2': { display: 'Dorian ♭2' },
		'lydian-sharp-5': { display: 'Lydian #5' },
		'lydian-dominant': { display: 'Lydian Dominant' },
		'mixolydian-flat-6': { display: 'Mixolydian ♭6' },
		'locrian-sharp-2': { display: 'Locrian #2' },
		altered: { display: 'Altered / Super Locrian' },
	},
	'Modes of the Harmonic Minor': {
		'harmonic-minor': { display: 'Harmonic Minor' },
		'locrian-sharp-6': { display: 'Locrian #6' },
		'ionian-sharp-5': { display: 'Ionian #5' },
		'dorian-sharp-4': { display: 'Dorian #4' },
		'phrygian-dominant': { display: 'Phrygian Dominant' },
		'lydian-sharp-2': { display: 'Lydian #2' },
		'super-locrian': { display: 'Super Locrian ♭♭7' },
	},
	'Blues & Pentatonic': {
		pentatonic: { display: 'Major Pentatonic' },
		'minor-pentatonic': { display: 'Minor Pentatonic' },
		'major-blues': { display: 'Major Blues' },
		'minor-blues': { display: 'Minor Blues' },
		'dominant-pentatonic': { display: 'Dominant Pentatonic' },
	},
	'Symmetric & Exotic Scales': {
		'harmonic-major': { display: 'Harmonic Major' },
		'double-harmonic-minor': { display: 'Double Harmonic Major' },
		'hungarian-minor': { display: 'Hungarian Minor' },
		'whole-tone': { display: 'Whole Tone' },
		'half-whole-diminished': { display: 'Half-Whole Diminished' },
		'whole-half-diminished': { display: 'Whole-Half Diminished' },
	},
};

function getIntervalKeys(): IntervalKey[] {
	const keys = Object.keys(INTERVALS);
	return keys.filter((key): key is IntervalKey => key in INTERVALS);
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
