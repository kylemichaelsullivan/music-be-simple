import type { NoteIndex } from '@/types';
import { FLATS, SHARPS, isValidNoteIndex } from './notes';

export type ChordInfo = {
	symbol: string;
	display: string;
};

type interval = number;
type label = string;
type nerdSymbol = string;
type jazzSymbol = string;
export type border = 'double' | 'solid' | 'dashed' | 'dotted' | 'none';

export type ChordData = {
	display: string;
	intervals: [interval, label, border][];
	symbols: [nerdSymbol, jazzSymbol];
};

export type ChordGroup = Record<string, ChordData>;

export const CHORDS: Record<string, ChordGroup> = {
	'Simple Triads': {
		major: {
			display: 'Major',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
			],
			symbols: ['M', 'M'],
		},
		minor: {
			display: 'Minor',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
			],
			symbols: ['m', '–'],
		},
		'power-chord': {
			display: 'Power Chord',
			intervals: [[3.5, '5', 'double']],
			symbols: ['5', '5'],
		},
	},
	'Other Triads': {
		sus2: {
			display: 'Suspended 2',
			intervals: [
				[1, '2', 'double'],
				[2.5, '5', 'dotted'],
			],
			symbols: ['sus2', 'sus2'],
		},
		sus4: {
			display: 'Suspended 4',
			intervals: [
				[2.5, '4', 'double'],
				[1, '5', 'dotted'],
			],
			symbols: ['sus4', 'sus4'],
		},
		diminished: {
			display: 'Diminished',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
			],
			symbols: ['dim', '°'],
		},
		augmented: {
			display: 'Augmented',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
			],
			symbols: ['aug', '+'],
		},
	},
	'Sixth Chords': {
		'major-6': {
			display: 'Major 6',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1, '6', 'double'],
			],
			symbols: ['6', '6'],
		},
		'minor-6': {
			display: 'Minor 6',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1, '6', 'double'],
			],
			symbols: ['m6', '–6'],
		},
	},
	'Sixth Ninth Chords': {
		'major-6-9': {
			display: 'Major 6/9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1, '6', 'double'],
				[2, '9', 'double'],
			],
			symbols: ['6/9', '6/9'],
		},
		'minor-6-9': {
			display: 'Minor 6/9',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1, '6', 'double'],
				[2, '9', 'double'],
			],
			symbols: ['m6/9', '–6/9'],
		},
	},
	'Seventh Chords': {
		'major-7': {
			display: 'Major 7',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
			],
			symbols: ['maj7', '△7'],
		},
		'dominant-7': {
			display: 'Dominant 7',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
			],
			symbols: ['7', '7'],
		},
		'minor-7': {
			display: 'Minor 7',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
			],
			symbols: ['m7', '–7'],
		},
		'minor-major-7': {
			display: 'Minor Major 7',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[2, '7', 'double'],
			],
			symbols: ['m(maj7)', '–△7'],
		},
		'augmented-major-7': {
			display: 'Augmented Major 7',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
				[1.5, '7', 'double'],
			],
			symbols: ['augmaj7', '+△7'],
		},
		'augmented-dominant-7': {
			display: 'Augmented Dominant 7',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
				[1, '♭7', 'double'],
			],
			symbols: ['aug7', '+7'],
		},
		'half-diminished-7': {
			display: 'Half Diminished 7',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[2, '♭7', 'double'],
			],
			symbols: ['ø', 'ø'],
		},
		'diminished-7': {
			display: 'Diminished 7',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[1.5, '♭♭7', 'solid'],
			],
			symbols: ['dim7', '°7'],
		},
	},
	'Ninth Chords': {
		'major-9': {
			display: 'Major 9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[1.5, '9', 'double'],
			],
			symbols: ['maj9', '△9'],
		},
		'dominant-9': {
			display: 'Dominant 9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'double'],
			],
			symbols: ['9', '9'],
		},
		'minor-9': {
			display: 'Minor 9',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'double'],
			],
			symbols: ['m9', '–9'],
		},
		'minor-major-9': {
			display: 'Minor Major 9',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[2, '7', 'double'],
				[1.5, '9', 'double'],
			],
			symbols: ['m(maj9)', '–△9'],
		},
		add9: {
			display: 'Major Add 9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[3.5, '9', 'double'],
			],
			symbols: ['add9', 'add9'],
		},
		'minor-add9': {
			display: 'Minor Add 9',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[3.5, '9', 'double'],
			],
			symbols: ['madd9', '–add9'],
		},
		'augmented-dominant-9': {
			display: 'Augmented Dominant 9',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
				[1, '♭7', 'double'],
				[2, '9', 'double'],
			],
			symbols: ['aug9', '+9'],
		},
		'dominant-7-flat-9': {
			display: 'Dominant 7 Flat 9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[1.5, '♭9', 'solid'],
			],
			symbols: ['7♭9', '7♭9'],
		},
		'dominant-7-sharp-9': {
			display: 'Dominant 7 Sharp 9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2.5, '♯9', 'solid'],
			],
			symbols: ['7♯9', '7♯9'],
		},
		'half-diminished-9': {
			display: 'Half Diminished 9',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[2, '♭7', 'double'],
				[1.5, '9', 'double'],
			],
			symbols: ['ø9', 'ø9'],
		},
		'diminished-9': {
			display: 'Diminished 9',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[1.5, '♭♭7', 'solid'],
				[2, '9', 'double'],
			],
			symbols: ['dim9', '°9'],
		},
	},
	'Eleventh Chords': {
		'major-11': {
			display: 'Major 11',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[1.5, '9', 'dashed'],
				[1.5, '11', 'double'],
			],
			symbols: ['maj11', '△11'],
		},
		'dominant-11': {
			display: 'Dominant 11',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'dashed'],
				[1.5, '11', 'double'],
			],
			symbols: ['11', '11'],
		},
		'minor-11': {
			display: 'Minor 11',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'dashed'],
				[1.5, '11', 'double'],
			],
			symbols: ['m11', '–11'],
		},
		add11: {
			display: 'Major Add 11',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[3.5, '9', 'dashed'],
				[1.5, '11', 'double'],
			],
			symbols: ['add11', 'add11'],
		},
		'minor-add11': {
			display: 'Minor Add 11',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[3.5, '9', 'dashed'],
				[1.5, '11', 'double'],
			],
			symbols: ['madd11', '–add11'],
		},
		'augmented-dominant-11': {
			display: 'Augmented Dominant 11',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
				[1, '♭7', 'double'],
				[2, '9', 'dashed'],
				[1.5, '11', 'double'],
			],
			symbols: ['aug11', '+11'],
		},
		'dominant-7-sharp-11': {
			display: 'Dominant 7 Sharp 11',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[4, '♯11', 'solid'],
			],
			symbols: ['7♯11', '7♯11'],
		},
		'half-diminished-11': {
			display: 'Half Diminished 11',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[2, '♭7', 'double'],
				[1.5, '9', 'dashed'],
				[2, '11', 'double'],
			],
			symbols: ['ø11', 'ø11'],
		},
		'diminished-11': {
			display: 'Diminished 11',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[1.5, '♭♭7', 'solid'],
				[2, '9', 'dashed'],
				[2, '11', 'double'],
			],
			symbols: ['dim11', '°11'],
		},
	},
	'Thirteenth Chords': {
		'major-13': {
			display: 'Major 13',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[1.5, '9', 'dashed'],
				[1.5, '11', 'none'],
				[2, '13', 'double'],
			],
			symbols: ['maj13', '△13'],
		},
		'dominant-13': {
			display: 'Dominant 13',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'dashed'],
				[1.5, '11', 'none'],
				[2, '13', 'double'],
			],
			symbols: ['13', '13'],
		},
		'minor-13': {
			display: 'Minor 13',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'dashed'],
				[1.5, '11', 'none'],
				[2, '13', 'double'],
			],
			symbols: ['m13', '–13'],
		},
		add13: {
			display: 'Major Add 13',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[3.5, '9', 'dashed'],
				[1.5, '11', 'none'],
				[2, '13', 'double'],
			],
			symbols: ['add13', 'add13'],
		},
		'minor-add13': {
			display: 'Minor Add 13',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[3.5, '9', 'dashed'],
				[1.5, '11', 'none'],
				[2, '13', 'double'],
			],
			symbols: ['madd13', '–add13'],
		},
		'augmented-dominant-13': {
			display: 'Augmented Dominant 13',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
				[1, '♭7', 'double'],
				[2, '9', 'dashed'],
				[1.5, '11', 'none'],
				[2, '13', 'double'],
			],
			symbols: ['aug13', '+13'],
		},
		'dominant-7-flat-13': {
			display: 'Dominant 7 Flat 13',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[5, '♭13', 'solid'],
			],
			symbols: ['7♭13', '7♭13'],
		},
		'half-diminished-13': {
			display: 'Half Diminished 13',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[2, '♭7', 'double'],
				[1.5, '9', 'dashed'],
				[4, '13', 'double'],
			],
			symbols: ['ø13', 'ø13'],
		},
		'diminished-13': {
			display: 'Diminished 13',
			intervals: [
				[1.5, '♭3', 'double'],
				[1.5, '♭5', 'double'],
				[1.5, '♭♭7', 'solid'],
				[2, '9', 'dashed'],
				[4, '13', 'double'],
			],
			symbols: ['dim13', '°13'],
		},
	},
	'Suspended Chords': {
		'dominant-7-sus4': {
			display: 'Dominant 7 Sus4',
			intervals: [
				[2.5, '4', 'double'],
				[1, '5', 'dotted'],
				[1.5, '♭7', 'double'],
			],
			symbols: ['7sus4', '7sus4'],
		},
		'dominant-9-sus4': {
			display: 'Dominant 9 Sus4',
			intervals: [
				[2.5, '4', 'double'],
				[1, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'double'],
			],
			symbols: ['9sus4', '9sus4'],
		},
		'dominant-13-sus4': {
			display: 'Dominant 13 Sus4',
			intervals: [
				[2.5, '4', 'double'],
				[1, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2, '9', 'dashed'],
				[1.5, '11', 'none'],
				[2, '13', 'double'],
			],
			symbols: ['13sus4', '13sus4'],
		},
	},
	'Altered Chords': {
		'major-7-sharp-5': {
			display: 'Major 7 Sharp 5',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
				[1.5, '7', 'double'],
			],
			symbols: ['maj7♯5', '△7♯5'],
		},
		'major-7-flat-5': {
			display: 'Major 7 Flat 5',
			intervals: [
				[2, '3', 'double'],
				[1, '♭5', 'double'],
				[2.5, '7', 'double'],
			],
			symbols: ['maj7♭5', '△7♭5'],
		},
		'dominant-7-sharp-5': {
			display: 'Dominant 7 Sharp 5',
			intervals: [
				[2, '3', 'double'],
				[2, '♯5', 'double'],
				[1, '♭7', 'double'],
			],
			symbols: ['7♯5', '7♯5'],
		},
		'dominant-7-flat-5': {
			display: 'Dominant 7 Flat 5',
			intervals: [
				[2, '3', 'double'],
				[1, '♭5', 'double'],
				[2, '♭7', 'double'],
			],
			symbols: ['7♭5', '7♭5'],
		},
		'minor-7-sharp-5': {
			display: 'Minor 7 Sharp 5',
			intervals: [
				[1.5, '♭3', 'double'],
				[2.5, '♯5', 'solid'],
				[1, '♭7', 'double'],
			],
			symbols: ['m7♯5', '–7♯5'],
		},
		'minor-7-flat-5': {
			display: 'Minor 7 Flat 5',
			intervals: [
				[1.5, '♭3', 'double'],
				[1, '♭5', 'double'],
				[2, '♭7', 'double'],
			],
			symbols: ['m7♭5', '–7♭5'],
		},
		'major-7-sharp-9': {
			display: 'Major 7 Sharp 9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[2, '♯9', 'solid'],
			],
			symbols: ['maj7♯9', '△7♯9'],
		},
		'major-7-flat-9': {
			display: 'Major 7 Flat 9',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[1, '♭9', 'double'],
			],
			symbols: ['maj7♭9', '△7♭9'],
		},
		'minor-7-sharp-9': {
			display: 'Minor 7 Sharp 9',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2.5, '♯9', 'solid'],
			],
			symbols: ['m7♯9', '–7♯9'],
		},
		'minor-7-flat-9': {
			display: 'Minor 7 Flat 9',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[1.5, '♭9', 'solid'],
			],
			symbols: ['m7♭9', '–7♭9'],
		},
		'dominant-7-flat-11': {
			display: 'Dominant 7 Flat 11',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2.5, '♭11', 'solid'],
			],
			symbols: ['7♭11', '7♭11'],
		},
		'major-7-sharp-11': {
			display: 'Major 7 Sharp 11',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[3.5, '♯11', 'solid'],
			],
			symbols: ['maj7♯11', '△7♯11'],
		},
		'major-7-flat-11': {
			display: 'Major 7 Flat 11',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[2.5, '♭11', 'solid'],
			],
			symbols: ['maj7♭11', '△7♭11'],
		},
		'minor-7-sharp-11': {
			display: 'Minor 7 Sharp 11',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[3.5, '♯11', 'solid'],
			],
			symbols: ['m7♯11', '–7♯11'],
		},
		'minor-7-flat-11': {
			display: 'Minor 7 Flat 11',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[2.5, '♭11', 'solid'],
			],
			symbols: ['m7♭11', '–7♭11'],
		},
		'dominant-7-sharp-13': {
			display: 'Dominant 7 Sharp 13',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[3.5, '♯13', 'solid'],
			],
			symbols: ['7♯13', '7♯13'],
		},
		'major-7-sharp-13': {
			display: 'Major 7 Sharp 13',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[5.5, '♯13', 'double'],
			],
			symbols: ['maj7♯13', '△7♯13'],
		},
		'major-7-flat-13': {
			display: 'Major 7 Flat 13',
			intervals: [
				[2, '3', 'double'],
				[1.5, '5', 'dotted'],
				[2, '7', 'double'],
				[4.5, '♭13', 'solid'],
			],
			symbols: ['maj7♭13', '△7♭13'],
		},
		'minor-7-sharp-13': {
			display: 'Minor 7 Sharp 13',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[5.5, '♯13', 'double'],
			],
			symbols: ['m7♯13', '–7♯13'],
		},
		'minor-7-flat-13': {
			display: 'Minor 7 Flat 13',
			intervals: [
				[1.5, '♭3', 'double'],
				[2, '5', 'dotted'],
				[1.5, '♭7', 'double'],
				[5, '♭13', 'solid'],
			],
			symbols: ['m7♭13', '–7♭13'],
		},
	},
} as const;

export const getChordInfo = (variant: Chord_Variant): ChordData => {
	for (const group of Object.values(CHORDS)) {
		if (variant in group) {
			return group[variant];
		}
	}

	const normalizedVariant = variant.toLowerCase().replace(/-/g, '');
	for (const group of Object.values(CHORDS)) {
		for (const [key, data] of Object.entries(group)) {
			const normalizedKey = key.toLowerCase().replace(/-/g, '');
			if (normalizedKey === normalizedVariant) {
				return data;
			}
		}
	}

	return CHORDS['Simple Triads'].major;
};

export const getChordSymbol = (variant: Chord_Variant, isNerdMode: boolean): string => {
	const chordInfo = getChordInfo(variant);
	return isNerdMode ? chordInfo.symbols[0] : chordInfo.symbols[1];
};

export const getChordGroups = () => Object.keys(CHORDS);

export const getChordVariants = (group: string) => Object.keys(CHORDS[group]);

/** Scale degree for border logic: 1–6 = lower octave borders, 7+ = upper octave borders */
const LABEL_TO_DEGREE: Record<string, number> = {
	'2': 2,
	'3': 3,
	'♭3': 3,
	'4': 4,
	'♯4': 4,
	'5': 5,
	'♯5': 5,
	'♭5': 5,
	'6': 6,
	'7': 7,
	'♭7': 7,
	'♭♭7': 7,
	'9': 9,
	'♭9': 9,
	'♯9': 9,
	'11': 11,
	'♭11': 11,
	'♯11': 11,
	'13': 13,
	'♭13': 13,
	'♯13': 13,
};

function parseLabelToDegree(label: string): number {
	const degree = LABEL_TO_DEGREE[label];
	if (degree !== undefined) return degree;
	const match = label.match(/\d+/);
	return match ? Number.parseInt(match[0], 10) : 1;
}

/**
 * Optional piano voicing overrides for Jazz mode (e.g. 6/9 with b9).
 * Maps variant -> semitone offsets per scale degree (overrides chord intervals for piano).
 */
export type PianoVoicingOverride = {
	/** Order of (semitones from root, degree). Default is built from chord intervals. */
	voicing: { semitones: number; degree: number }[];
};

const PIANO_VOICING_OVERRIDES: Partial<Record<Chord_Variant, PianoVoicingOverride>> = {
	'major-6-9': {
		voicing: [
			{ semitones: 0, degree: 1 },
			{ semitones: 1, degree: 9 },
			{ semitones: 4, degree: 3 },
			{ semitones: 7, degree: 5 },
			{ semitones: 9, degree: 6 },
		],
	},
};

const PIANO_KEYS = 24;
const LOWER_OCTAVE_KEYS = 12;

export type PianoVoicingResult = {
	/** For each key index 0–23, scale degree (1–13) or undefined if not a chord tone */
	voicingByKeyIndex: (number | undefined)[];
	/** Border style per scale degree (from chord intervals: double, dotted, dashed, solid) */
	degreeToBorderStyle: Record<number, border>;
	/** Unique note indices in the voicing (for which keys to highlight on piano) */
	notes: NoteIndex[];
};

/**
 * Build two-octave piano voicing for Jazz mode. Assigns (noteIndex, degree) to each key.
 * Border rule: lower octave (keyIndex < 12) border only degree ≤ 6; upper octave border only degree ≥ 7.
 */
export function getPianoVoicing(tonic: NoteIndex, variant: Chord_Variant): PianoVoicingResult {
	const chordInfo = getChordInfo(variant);
	const degreeToBorderStyle: Record<number, border> = {};
	for (const [, label, style] of chordInfo.intervals) {
		const degree = parseLabelToDegree(label);
		degreeToBorderStyle[degree] = style;
	}

	const override = PIANO_VOICING_OVERRIDES[variant];
	const voicingOrder: { semitones: number; degree: number }[] = override
		? override.voicing
		: (() => {
				const result: { semitones: number; degree: number }[] = [
					{ semitones: 0, degree: 1 },
				];
				let currentSemitones = 0;
				for (const [interval, label] of chordInfo.intervals) {
					currentSemitones += interval * 2;
					const semitones = Math.round(currentSemitones) % 12;
					const degree = parseLabelToDegree(label);
					result.push({ semitones, degree });
				}
				return result;
			})();

	const noteSet = new Set<NoteIndex>();
	const voicingWithNoteIndex = voicingOrder.map(({ semitones, degree }) => {
		const noteIndex = ((tonic + semitones) % 12 + 12) % 12;
		if (isValidNoteIndex(noteIndex as NoteIndex)) noteSet.add(noteIndex as NoteIndex);
		return { noteIndex, degree };
	});

	const voicingByKeyIndex: (number | undefined)[] = Array(PIANO_KEYS).fill(undefined);
	const twoOctaves = [...voicingWithNoteIndex, ...voicingWithNoteIndex];
	const nextKeyForNote = new Map<number, number>();

	for (const { noteIndex, degree } of twoOctaves) {
		const n = ((noteIndex % 12) + 12) % 12;
		if (!isValidNoteIndex(n as NoteIndex)) continue;
		const keyIndex = nextKeyForNote.get(n) ?? n;
		if (keyIndex < PIANO_KEYS) {
			voicingByKeyIndex[keyIndex] = degree;
			nextKeyForNote.set(n, keyIndex + LOWER_OCTAVE_KEYS);
		}
	}

	return {
		voicingByKeyIndex,
		degreeToBorderStyle,
		notes: Array.from(noteSet) as NoteIndex[],
	};
}

/**
 * Jazz border rule: no border on 7th+ in lower octave, no border on below-7th in upper octave.
 * Uses the chord's interval border style (double, dotted, dashed, solid) for the degree.
 */
export function getPianoBorderStyle(
	voicingByKeyIndex: (number | undefined)[],
	keyIndex: number,
	tonic: NoteIndex,
	note: NoteIndex,
	degreeToBorderStyle: Record<number, border>
): border | null {
	if (note === tonic) return 'none';
	const degree = voicingByKeyIndex[keyIndex];
	if (degree === undefined) return null;
	const isLowerOctave = keyIndex < LOWER_OCTAVE_KEYS;
	if (isLowerOctave && degree > 8) return 'none';
	if (!isLowerOctave && degree <= 8) return 'none';
	return degreeToBorderStyle[degree] ?? 'double';
}

export const generateChordNotes = (tonic: NoteIndex, variant: Chord_Variant): NoteIndex[] => {
	const chordInfo = getChordInfo(variant);
	const chordNotes: NoteIndex[] = [tonic];
	const seen = new Set([tonic]);
	let currentSemitones = 0;

	for (const [interval] of chordInfo.intervals) {
		// interval is in "steps" where 1 = whole step (2 semitones), 0.5 = half step (1 semitone)
		currentSemitones += interval * 2;
		const n = (tonic + Math.round(currentSemitones)) % 12;
		if (isValidNoteIndex(n) && !seen.has(n)) {
			chordNotes.push(n);
			seen.add(n);
		}
	}

	return chordNotes;
};

export type Chord_Variant = {
	[K in keyof typeof CHORDS]: keyof (typeof CHORDS)[K];
}[keyof typeof CHORDS];

const chordVariantKeys = new Set<string>();
for (const group of Object.values(CHORDS)) {
	for (const key of Object.keys(group)) {
		chordVariantKeys.add(key);
	}
}

export function isValidChordVariant(value: string): value is Chord_Variant {
	return chordVariantKeys.has(value);
}

type ParsedChord = {
	tonic: number | null;
	variant: Chord_Variant | null;
};

export function parseChordName(input: string, usingFlats: boolean): ParsedChord {
	const trimmed = input.trim();
	if (!trimmed) {
		return { tonic: null, variant: null };
	}

	const noteNames = usingFlats ? FLATS : SHARPS;

	let tonic: number | null = null;
	let remaining = trimmed;

	for (let i = 0; i < noteNames.length; i++) {
		const noteName = noteNames[i];
		if (trimmed.startsWith(noteName)) {
			tonic = i;
			remaining = trimmed.slice(noteName.length);
			break;
		}
	}

	if (tonic === null) {
		const altNoteNames = usingFlats ? SHARPS : FLATS;
		for (let i = 0; i < altNoteNames.length; i++) {
			const noteName = altNoteNames[i];
			if (trimmed.startsWith(noteName)) {
				tonic = i;
				remaining = trimmed.slice(noteName.length);
				break;
			}
		}
	}

	if (tonic === null) {
		return { tonic: null, variant: null };
	}

	if (!remaining) {
		return { tonic, variant: 'major' };
	}

	let variant: Chord_Variant | null = null;
	const remainingLower = remaining.toLowerCase().trim();

	for (const group of Object.values(CHORDS)) {
		for (const [variantKey, chordData] of Object.entries(group)) {
			const symbols = chordData.symbols;
			const nerdSymbol = symbols[0].toLowerCase();
			const jazzSymbol = symbols[1].toLowerCase();

			if (
				remainingLower === nerdSymbol ||
				remainingLower === jazzSymbol ||
				remainingLower.startsWith(nerdSymbol) ||
				remainingLower.startsWith(jazzSymbol)
			) {
				if (isValidChordVariant(variantKey)) {
					variant = variantKey;
					break;
				}
			}
		}
		if (variant) break;
	}

	if (variant === null) {
		variant = 'major';
	}

	return { tonic, variant };
}
