import type { ICONS, INSTRUMENTS } from '@/instruments';
import type { TABS } from '@/navigation';
import type { INTERVALS } from '@/utils/notes';

// Helper types
type ReplaceSpaceWithDash<T extends string> = T extends `${infer Head} ${infer Tail}`
	? `${Head}-${ReplaceSpaceWithDash<Tail>}`
	: T;

// Basic types
export type AccidentalType = '♭' | '♯';
export type XDirectionType = 'left' | 'right';
export type YDirectionType = 'up' | 'down';

// Chord types
export type Chord_NoteCount = number;
export type Chord_Tonic = NoteIndex;
export type Chord_UsingFlats = boolean;

// Instrument & Icon types
export type ActionIconName = 'add' | 'pen' | 'save' | 'trash' | YDirectionType;
export type IconName = InstrumentType | 'Modes';
export type IconSize = 'lg' | 'md' | 'sm' | 'xs';
export type IconType = (typeof ICONS)[number];
export type InstrumentType = (typeof INSTRUMENTS)[number];
export type NerdModeButtonIcon = '🤓' | '💃🏾';
export type NoteLabelsButtonIcon = '📖' | '📕';
export type TunableInstrument = 'Banjo' | 'Guitar' | 'Mandolin' | 'Ukulele';

// Navigation types
export type TabType = (typeof TABS)[number];
export type tabType = Lowercase<ReplaceSpaceWithDash<(typeof TABS)[number]>>;

// Position types
export type PositionType = XPositionType | YPositionType;
export type XPositionType = XDirectionType;
export type YPositionType = 'bottom' | 'top';

// Scale types
export type NoteIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // representing semitones
export type ScaleMode =
	| 'aeolian'
	| 'dorian'
	| 'ionian'
	| 'locrian'
	| 'lydian'
	| 'mixolydian'
	| 'phrygian';
export type ScaleType = keyof typeof INTERVALS;

// Re-export types from utils
export type { Chord_Variant, ChordData, ChordGroup, ChordInfo, border } from '@/utils/chords';
export type { Notes_Flats, Notes_Sharps } from '@/utils/notes';

// Re-export types from type files
export type { ChordsContextType, ChordsContextProviderProps } from './chords';
export type { GlobalsContextType, GlobalsContextProviderProps } from './globals';
export type { InstrumentNotesContextType } from './instrumentNotes';
export type {
	ChordBinItemData,
	NotepadItemData,
	NotepadLineData,
	NotepadLineTitleData,
	PlayContextType,
	PlayContextProviderProps,
	ReferenceMode,
	SaveActionType,
} from './play';
export type {
	DisplaysProps,
	DisplaysSelectorProps,
	PageLayoutProps,
	PageTopButtonProps,
} from './layout';
export type { ScalesContextType, ScalesContextProviderProps } from './scales';
export type { TuningsContextType, TuningsContextProviderProps } from './tunings';
