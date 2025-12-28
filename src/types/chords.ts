import type { Chord_NoteCount, Chord_Tonic, Chord_Variant, border } from '@/types';
import type { ReactNode } from 'react';

export type ChordsContextType = {
	tonic: Chord_Tonic;
	variant: Chord_Variant;
	notes: number[];
	chordName: string;
	noteCount: Chord_NoteCount;
	handleTonicChange: (tonic: Chord_Tonic) => void;
	handleVariantChange: (variant: Chord_Variant) => void;
	getBorderStyle: (note: number) => border;
	makeScale: (tonic: Chord_Tonic, variant: Chord_Variant) => void;
	reset: () => void;
};

export type ChordsContextProviderProps = {
	children: ReactNode;
};
