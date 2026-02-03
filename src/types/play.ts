import type { Chord_Tonic, Chord_Variant, InstrumentType } from '@/types';
import type { ReactNode } from 'react';

export type ChordBinItemData = {
	tonic: Chord_Tonic;
	variant: Chord_Variant;
	id: number;
	name?: string;
};

export type NotepadLineData = {
	text: string;
	chords: (number | null)[];
	id: number;
};

export type NotepadLineTitleData = {
	title: string;
	type: 'title';
	id: number;
};

export type NotepadItemData = NotepadLineData | NotepadLineTitleData;

export type PlayContextProviderProps = {
	children: ReactNode;
};

export type PlayContextType = {
	activeInstrument: InstrumentType | null;
	addChordBinItem: () => void;
	addNotepadLine: () => void;
	addNotepadTitle: () => void;
	chordBinItems: ChordBinItemData[];
	editingItemId: number | null;
	exportAll: () => void;
	exportChordBin: () => void;
	exportNotepad: () => void;
	importAll: (data: { chordBin: ChordBinItemData[]; notepad: NotepadItemData[] }) => void;
	importChordBin: (items: ChordBinItemData[]) => void;
	importNotepad: (items: NotepadItemData[]) => void;
	notepadItems: NotepadItemData[];
	referenceMode: ReferenceMode;
	removeChordBinItem: (id: number) => void;
	removeNotepadItem: (id: number) => void;
	reorderChordBinItems: (fromIndex: number, toIndex: number) => void;
	reorderNotepadItems: (fromIndex: number, toIndex: number) => void;
	reset: () => void;
	setActiveInstrument: (instrument: InstrumentType | null) => void;
	setEditingItemId: (id: number | null) => void;
	toggleReferenceMode: () => void;
	updateChordBinItem: (
		id: number,
		updates: Partial<Pick<ChordBinItemData, 'tonic' | 'variant' | 'name'>>
	) => void;
	updateNotepadLine: (id: number, text: string) => void;
	updateNotepadTitle: (id: number, title: string) => void;
	updateNotepadLineChord: (lineId: number, slotIndex: number, chordId: number | null) => void;
};

export type ReferenceMode = 'Chords' | 'Scales';

export type SaveActionType = 'Export' | 'Import';
