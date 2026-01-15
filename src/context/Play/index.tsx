import { useChords } from '@/hooks';
import {
	ChordBinStorageSchema,
	InstrumentTypeSchema,
	NotepadStorageSchema,
	ReferenceModeSchema,
} from '@/schemas';
import type {
	ChordBinItemData,
	InstrumentType,
	NotepadLineData,
	PlayContextProviderProps,
	ReferenceMode,
} from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from '../shared/useLocalStorage';
import { useRequireGlobals } from '../shared/useRequireGlobals';
import { PlayContext } from './PlayContext';

export { PlayContext };

const initialReferenceMode: ReferenceMode = 'Scales';

export const PlayContextProvider = ({ children }: PlayContextProviderProps) => {
	useRequireGlobals();
	const { tonic, variant } = useChords();

	// State
	const [referenceMode, setReferenceMode] = useLocalStorage<ReferenceMode>(
		'referenceMode',
		ReferenceModeSchema,
		initialReferenceMode
	);

	const [activeInstrument, setActiveInstrument] = useLocalStorage<InstrumentType | null>(
		'activeInstrument',
		InstrumentTypeSchema.nullable(),
		null
	);

	const [editingItemId, setEditingItemId] = useState<number | null>(null);

	const [chordBinItems, setChordBinItems] = useLocalStorage<ChordBinItemData[]>(
		'chordBinItems',
		ChordBinStorageSchema,
		[]
	);

	const [notepadLines, setNotepadLines] = useLocalStorage<NotepadLineData[]>(
		'notepadLines',
		NotepadStorageSchema,
		[]
	);

	// Chord Bin operations
	const addChordBinItem = useCallback(() => {
		setChordBinItems((prev) => [...prev, { id: Date.now(), tonic, variant }]);
	}, [tonic, variant, setChordBinItems]);

	const removeChordBinItem = useCallback(
		(id: number) => {
			setChordBinItems((prev) => prev.filter((item) => item.id !== id));
		},
		[setChordBinItems]
	);

	const updateChordBinItem = useCallback(
		(id: number, updates: Partial<Pick<ChordBinItemData, 'tonic' | 'variant'>>) => {
			setChordBinItems((prev) =>
				prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
			);
		},
		[setChordBinItems]
	);

	// Notepad operations
	const addNotepadLine = useCallback(() => {
		setNotepadLines((prev) => [...prev, { id: Date.now(), content: '' }]);
	}, [setNotepadLines]);

	const removeNotepadLine = useCallback(
		(id: number) => {
			setNotepadLines((prev) => prev.filter((line) => line.id !== id));
		},
		[setNotepadLines]
	);

	const updateNotepadLine = useCallback(
		(id: number, content: string) => {
			setNotepadLines((prev) => prev.map((line) => (line.id === id ? { ...line, content } : line)));
		},
		[setNotepadLines]
	);

	// Import operations
	const importChordBin = useCallback(
		(items: ChordBinItemData[]) => {
			setChordBinItems(items);
		},
		[setChordBinItems]
	);

	const importNotepad = useCallback(
		(lines: NotepadLineData[]) => {
			setNotepadLines(lines);
		},
		[setNotepadLines]
	);

	const importAll = useCallback(
		(data: { chordBin: ChordBinItemData[]; notepad: NotepadLineData[] }) => {
			setChordBinItems(data.chordBin);
			setNotepadLines(data.notepad);
		},
		[setChordBinItems, setNotepadLines]
	);

	// Export operations
	const exportChordBin = useCallback(() => {
		const data = { chordBin: chordBinItems };
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `chord-bin-${Date.now()}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [chordBinItems]);

	const exportNotepad = useCallback(() => {
		const data = { notepad: notepadLines };
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `notepad-${Date.now()}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [notepadLines]);

	const exportAll = useCallback(() => {
		const data = { chordBin: chordBinItems, notepad: notepadLines };
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `music-be-simple-${Date.now()}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [chordBinItems, notepadLines]);

	// Other operations
	const toggleReferenceMode = useCallback(() => {
		setReferenceMode((prev: ReferenceMode) => (prev === 'Scales' ? 'Chords' : 'Scales'));
	}, [setReferenceMode]);

	const reset = useCallback(() => {
		setChordBinItems([]);
		setNotepadLines([]);
	}, [setChordBinItems, setNotepadLines]);

	// Context value
	const contextValue = useMemo(
		() => ({
			activeInstrument,
			addChordBinItem,
			addNotepadLine,
			chordBinItems,
			editingItemId,
			exportAll,
			exportChordBin,
			exportNotepad,
			importAll,
			importChordBin,
			importNotepad,
			notepadLines,
			referenceMode,
			removeChordBinItem,
			removeNotepadLine,
			reset,
			setActiveInstrument,
			setEditingItemId,
			toggleReferenceMode,
			updateChordBinItem,
			updateNotepadLine,
		}),
		[
			activeInstrument,
			addChordBinItem,
			addNotepadLine,
			chordBinItems,
			editingItemId,
			exportAll,
			exportChordBin,
			exportNotepad,
			importAll,
			importChordBin,
			importNotepad,
			notepadLines,
			referenceMode,
			removeChordBinItem,
			removeNotepadLine,
			reset,
			setActiveInstrument,
			toggleReferenceMode,
			updateChordBinItem,
			updateNotepadLine,
		]
	);

	return <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>;
};
