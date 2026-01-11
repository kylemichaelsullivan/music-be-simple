import type {
	Chord_NoteCount,
	Chord_Tonic,
	Chord_Variant,
	NerdModeButtonIcon,
	NoteIndex,
	border,
} from '@/types';
import type { ReactNode } from 'react';

export type ChordsContextProviderProps = {
	children: ReactNode;
};

export type ChordsContextType = {
	chordName: string;
	getBorderStyle: (note: NoteIndex) => border;
	handleTonicChange: (tonic: Chord_Tonic) => void;
	handleVariantChange: (variant: Chord_Variant) => void;
	makeScale: (tonic: Chord_Tonic, variant: Chord_Variant) => void;
	nerdModeButtonIcon: NerdModeButtonIcon;
	nerdModeButtonTitle: string;
	noteCount: Chord_NoteCount;
	notes: NoteIndex[];
	reset: () => void;
	showNerdMode: boolean;
	tonic: Chord_Tonic;
	toggleNerdMode: () => void;
	variant: Chord_Variant;
};
