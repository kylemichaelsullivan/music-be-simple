import type { INSTRUMENTS } from '@/instruments';
import type { TABS } from '@/navigation';
import type { INTERVALS } from '@/utils/notes';

type ReplaceSpaceWithDash<T extends string> = T extends `${infer Head} ${infer Tail}`
	? `${Head}-${ReplaceSpaceWithDash<Tail>}`
	: T;

export type AccidentalType = '♭' | '♯';

export type InstrumentType = (typeof INSTRUMENTS)[number];

export type TabType = (typeof TABS)[number];
export type tabType = Lowercase<ReplaceSpaceWithDash<(typeof TABS)[number]>>;

export type XPositionType = 'left' | 'right';
export type YPositionType = 'top' | 'bottom';
export type PositionType = XPositionType | YPositionType;

export type Chord_UsingFlats = boolean;
export type Chord_NoteCount = number;

export type Chord_Tonic = number;

// Scale-related types
export type NoteIndex = number; // 0-11 representing semitones
export type ScaleType = keyof typeof INTERVALS;
export type ScaleMode =
	| 'ionian'
	| 'dorian'
	| 'phrygian'
	| 'lydian'
	| 'mixolydian'
	| 'aeolian'
	| 'locrian';

// Re-export commonly used types for convenience (no circular dependencies)
export type { Chord_Variant, ChordData, ChordGroup, ChordInfo, border } from '@/utils/chords';
export type { Notes_Flats, Notes_Sharps } from '@/utils/notes';
