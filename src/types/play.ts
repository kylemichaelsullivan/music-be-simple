import type { Chord_Tonic, Chord_Variant, InstrumentType } from '@/types';
import type { ReactNode } from 'react';

export type ChordBinItemData = {
	id: number;
	tonic: Chord_Tonic;
	variant: Chord_Variant;
};

export type NotepadLineData = {
	content: string;
	id: number;
};

export type PlayContextProviderProps = {
	children: ReactNode;
};

export type PlayContextType = {
	activeInstrument: InstrumentType | null;
	addChordBinItem: () => void;
	addNotepadLine: () => void;
	chordBinItems: ChordBinItemData[];
	editingItemId: number | null;
	exportAll: () => void;
	exportChordBin: () => void;
	exportNotepad: () => void;
	importAll: (data: { chordBin: ChordBinItemData[]; notepad: NotepadLineData[] }) => void;
	importChordBin: (items: ChordBinItemData[]) => void;
	importNotepad: (lines: NotepadLineData[]) => void;
	notepadLines: NotepadLineData[];
	referenceMode: ReferenceMode;
	removeChordBinItem: (id: number) => void;
	removeNotepadLine: (id: number) => void;
	reset: () => void;
	setActiveInstrument: (instrument: InstrumentType | null) => void;
	setEditingItemId: (id: number | null) => void;
	toggleReferenceMode: () => void;
	updateChordBinItem: (
		id: number,
		updates: Partial<Pick<ChordBinItemData, 'tonic' | 'variant'>>
	) => void;
	updateNotepadLine: (id: number, content: string) => void;
};

export type ReferenceMode = 'Chords' | 'Scales';

export type SaveActionType = 'Export' | 'Import';
