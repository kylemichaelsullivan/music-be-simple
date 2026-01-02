import type {
	Chord_NoteCount,
	Chord_Tonic,
	Chord_Variant,
	NerdModeButtonIcon,
	NoteIndex,
	border,
} from '@/types';
import type { ReactNode } from 'react';

export type ChordsContextType = {
	tonic: Chord_Tonic;
	variant: Chord_Variant;
	notes: NoteIndex[];
	chordName: string;
	noteCount: Chord_NoteCount;
	showNerdMode: boolean;
	handleTonicChange: (tonic: Chord_Tonic) => void;
	handleVariantChange: (variant: Chord_Variant) => void;
	getBorderStyle: (note: NoteIndex) => border;
	makeScale: (tonic: Chord_Tonic, variant: Chord_Variant) => void;
	toggleNerdMode: () => void;
	nerdModeButtonTitle: string;
	nerdModeButtonIcon: NerdModeButtonIcon;
	reset: () => void;
};

export type ChordsContextProviderProps = {
	children: ReactNode;
};
