import type { PlayContextProviderProps } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { useRequireGlobals } from '../shared/useRequireGlobals';
import { PlayContext } from './PlayContext';

export { PlayContext };

export const PlayContextProvider = ({ children }: PlayContextProviderProps) => {
	useRequireGlobals();

	// Chord Bin state
	const [chordBinItems, setChordBinItems] = useState<number[]>([]);

	const addChordBinItem = useCallback(() => {
		setChordBinItems((prev) => [...prev, Date.now()]);
	}, []);

	const removeChordBinItem = useCallback((id: number) => {
		setChordBinItems((prev) => prev.filter((itemId) => itemId !== id));
	}, []);

	// Notepad state
	const [notepadLines, setNotepadLines] = useState<number[]>([]);

	const addNotepadLine = useCallback(() => {
		setNotepadLines((prev) => [...prev, Date.now()]);
	}, []);

	const removeNotepadLine = useCallback((id: number) => {
		setNotepadLines((prev) => prev.filter((lineId) => lineId !== id));
	}, []);

	// Import handlers
	const importChordBin = useCallback((items: number[]) => {
		setChordBinItems(items);
	}, []);

	const importNotepad = useCallback((lines: number[]) => {
		setNotepadLines(lines);
	}, []);

	const importAll = useCallback((data: { chordBin: number[]; notepad: number[] }) => {
		setChordBinItems(data.chordBin);
		setNotepadLines(data.notepad);
	}, []);

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

	const reset = useCallback(() => {
		setChordBinItems([]);
		setNotepadLines([]);
	}, []);

	const contextValue = useMemo(
		() => ({
			chordBinItems,
			notepadLines,
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
			reset,
		}),
		[
			chordBinItems,
			notepadLines,
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
			reset,
		]
	);

	return <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>;
};
