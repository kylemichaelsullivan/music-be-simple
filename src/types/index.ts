import type { INSTRUMENTS } from '@/instruments';
import type { TABS } from '@/navigation';
import type { INTERVALS } from '@/utils/notes';

// Helper types
type ReplaceSpaceWithDash<T extends string> = T extends `${infer Head} ${infer Tail}`
	? `${Head}-${ReplaceSpaceWithDash<Tail>}`
	: T;

// Basic types
export type AccidentalType = '♭' | '♯';

// Navigation types
export type TabType = (typeof TABS)[number];
export type tabType = Lowercase<ReplaceSpaceWithDash<(typeof TABS)[number]>>;

// Position types
export type XPositionType = 'left' | 'right';
export type YPositionType = 'top' | 'bottom';
export type PositionType = XPositionType | YPositionType;

// Instrument & Icon types
export type InstrumentType = (typeof INSTRUMENTS)[number];
export type IconName = InstrumentType | 'Modes';
export type NerdModeButtonIcon = '🤓' | '💃🏾';
export type NoteLabelsButtonIcon = '📖' | '📕';

// Chord types
export type Chord_UsingFlats = boolean;
export type Chord_NoteCount = number;
export type Chord_Tonic = NoteIndex;

// Scale types
export type NoteIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // representing semitones
export type ScaleType = keyof typeof INTERVALS;
export type ScaleMode =
	| 'ionian'
	| 'dorian'
	| 'phrygian'
	| 'lydian'
	| 'mixolydian'
	| 'aeolian'
	| 'locrian';

// Re-export types from utils
export type { Chord_Variant, ChordData, ChordGroup, ChordInfo, border } from '@/utils/chords';
export type { Notes_Flats, Notes_Sharps } from '@/utils/notes';

// Re-export types from type files
export type { ChordsContextType, ChordsContextProviderProps } from './chords';
export type { GlobalsContextType, GlobalsContextProviderProps } from './globals';
export type { PlayContextType, PlayContextProviderProps } from './play';
export type { ScalesContextType, ScalesContextProviderProps } from './scales';
