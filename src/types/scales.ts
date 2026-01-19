import type { NoteIndex, NoteLabelsButtonIcon, ScaleMode, ScaleType } from '@/types';
import type { ReactNode } from 'react';

export type ScalesContextProviderProps = {
	children: ReactNode;
};

export type ScalesContextType = {
	getRelativeMajor: (mode: ScaleMode) => string;
	getRelativeMinor: (mode: ScaleMode) => string;
	handleTonicChange: (tonic: NoteIndex) => void;
	handleVariantChange: (variant: ScaleType) => void;
	makeScale: (tonic: NoteIndex, variant: ScaleType) => void;
	noteLabelsButtonIcon: NoteLabelsButtonIcon;
	noteLabelsButtonTitle: string;
	notes: NoteIndex[];
	reset: () => void;
	showModes: boolean;
	showNoteLabels: boolean;
	tonic: NoteIndex;
	toggleNoteLabels: () => void;
	variant: ScaleType;
};
