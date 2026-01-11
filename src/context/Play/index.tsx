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
import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '../shared/useLocalStorage';
import { useRequireGlobals } from '../shared/useRequireGlobals';
import { PlayContext } from './PlayContext';

export { PlayContext };

const initialReferenceMode: ReferenceMode = 'Scales';

export const PlayContextProvider = ({ children }: PlayContextProviderProps) => {
	useRequireGlobals();
	const { tonic, variant } = useChords();

	// Reference Mode state
	const [referenceMode, setReferenceMode] = useLocalStorage<ReferenceMode>(
		'referenceMode',
		ReferenceModeSchema,
		initialReferenceMode
	);

	// Active Instrument state
	const [activeInstrument, setActiveInstrument] = useLocalStorage<InstrumentType | null>(
		'activeInstrument',
		InstrumentTypeSchema.nullable(),
		null
	);

	// Chord Bin state
	const [chordBinItems, setChordBinItems] = useLocalStorage<ChordBinItemData[]>(
		'chordBinItems',
		ChordBinStorageSchema,
		[]
	);

	const addChordBinItem = useCallback(() => {
		setChordBinItems((prev) => [...prev, { id: Date.now(), tonic, variant }]);
	}, [tonic, variant, setChordBinItems]);

	const removeChordBinItem = useCallback(
		(id: number) => {
			setChordBinItems((prev) => prev.filter((item) => item.id !== id));
		},
		[setChordBinItems]
	);

	// Notepad state
	const [notepadLines, setNotepadLines] = useLocalStorage<NotepadLineData[]>(
		'notepadLines',
		NotepadStorageSchema,
		[]
	);

	const addNotepadLine = useCallback(() => {
		setNotepadLines((prev) => [...prev, { id: Date.now(), content: '' }]);
	}, [setNotepadLines]);

	const removeNotepadLine = useCallback(
		(id: number) => {
			setNotepadLines((prev) => prev.filter((line) => line.id !== id));
		},
		[setNotepadLines]
	);

	// Import handlers
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

	// Export handlers
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

	const toggleReferenceMode = useCallback(() => {
		setReferenceMode((prev: ReferenceMode) => (prev === 'Scales' ? 'Chords' : 'Scales'));
	}, [setReferenceMode]);

	const reset = useCallback(() => {
		setChordBinItems([]);
		setNotepadLines([]);
	}, [setChordBinItems, setNotepadLines]);

	const contextValue = useMemo(
		() => ({
			chordBinItems,
			notepadLines,
			referenceMode,
			activeInstrument,
			setActiveInstrument,
			addChordBinItem,
			removeChordBinItem,
			addNotepadLine,
			removeNotepadLine,
			importChordBin,
			importNotepad,
			importAll,
			exportChordBin,
			exportNotepad,
			exportAll,
			toggleReferenceMode,
			reset,
		}),
		[
			chordBinItems,
			notepadLines,
			referenceMode,
			activeInstrument,
			setActiveInstrument,
			addChordBinItem,
			removeChordBinItem,
			addNotepadLine,
			removeNotepadLine,
			importChordBin,
			importNotepad,
			importAll,
			exportChordBin,
			exportNotepad,
			exportAll,
			toggleReferenceMode,
			reset,
		]
	);

	return <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>;
};
