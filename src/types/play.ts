import type { ReactNode } from 'react';

export type PlayContextType = {
	chordBinItems: number[];
	notepadLines: number[];
	addChordBinItem: () => void;
	removeChordBinItem: (id: number) => void;
	addNotepadLine: () => void;
	removeNotepadLine: (id: number) => void;
	importChordBin: (items: number[]) => void;
	importNotepad: (lines: number[]) => void;
	importAll: (data: { chordBin: number[]; notepad: number[] }) => void;
	exportChordBin: () => void;
	exportNotepad: () => void;
	exportAll: () => void;
	reset: () => void;
};

export type PlayContextProviderProps = {
	children: ReactNode;
};

export type SaveActionType = 'Import' | 'Export';
