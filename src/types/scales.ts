import type { NoteIndex, ScaleMode, ScaleType } from '@/types';
import type { ReactNode } from 'react';

export type ScalesContextType = {
	tonic: NoteIndex;
	variant: ScaleType;
	notes: number[];
	showNoteLabels: boolean;
	handleTonicChange: (tonic: NoteIndex) => void;
	handleVariantChange: (variant: ScaleType) => void;
	makeScale: (tonic: NoteIndex, variant: ScaleType) => void;
	getRelativeMajor: (mode: ScaleMode) => string;
	getRelativeMinor: (mode: ScaleMode) => string;
	toggleNoteLabels: () => void;
	reset: () => void;
};

export type ScalesContextProviderProps = {
	children: ReactNode;
};
