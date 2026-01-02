import type { NoteIndex, NoteLabelsButtonIcon, ScaleMode, ScaleType } from '@/types';
import type { ReactNode } from 'react';

export type ScalesContextType = {
	tonic: NoteIndex;
	variant: ScaleType;
	notes: NoteIndex[];
	showNoteLabels: boolean;
	handleTonicChange: (tonic: NoteIndex) => void;
	handleVariantChange: (variant: ScaleType) => void;
	makeScale: (tonic: NoteIndex, variant: ScaleType) => void;
	getRelativeMajor: (mode: ScaleMode) => string;
	getRelativeMinor: (mode: ScaleMode) => string;
	toggleNoteLabels: () => void;
	noteLabelsButtonTitle: string;
	noteLabelsButtonIcon: NoteLabelsButtonIcon;
	reset: () => void;
};

export type ScalesContextProviderProps = {
	children: ReactNode;
};
