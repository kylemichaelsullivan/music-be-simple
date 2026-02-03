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
	NotepadItemData,
	NotepadLineData,
	PlayContextProviderProps,
	ReferenceMode,
} from '@/types';
import { useCallback, useMemo, useState } from 'react';
import type { z } from 'zod';
import { useLocalStorage, useRequireGlobals } from '../shared';
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

	const [notepadItems, setNotepadItems] = useLocalStorage<NotepadItemData[]>(
		'notepadLines',
		NotepadStorageSchema as z.ZodType<NotepadItemData[]>,
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
		(id: number, updates: Partial<Pick<ChordBinItemData, 'tonic' | 'variant' | 'name'>>) => {
			setChordBinItems((prev) =>
				prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
			);
		},
		[setChordBinItems]
	);

	const reorderChordBinItems = useCallback(
		(fromIndex: number, toIndex: number) => {
			setChordBinItems((prev) => {
				const newItems = [...prev];
				const [movedItem] = newItems.splice(fromIndex, 1);
				newItems.splice(toIndex, 0, movedItem);
				return newItems;
			});
		},
		[setChordBinItems]
	);

	// Notepad operations
	const addNotepadLine = useCallback(() => {
		setNotepadItems((prev) => [
			...prev,
			{ id: Date.now(), text: '', chords: Array(60).fill(null) },
		]);
	}, [setNotepadItems]);

	const addNotepadTitle = useCallback(() => {
		setNotepadItems((prev) => [...prev, { type: 'title' as const, id: Date.now(), title: '' }]);
	}, [setNotepadItems]);

	const removeNotepadItem = useCallback(
		(id: number) => {
			setNotepadItems((prev) => prev.filter((item) => item.id !== id));
		},
		[setNotepadItems]
	);

	const updateNotepadLine = useCallback(
		(id: number, text: string) => {
			setNotepadItems((prev) =>
				prev.map((item) => (item.id === id && 'text' in item ? { ...item, text } : item))
			);
		},
		[setNotepadItems]
	);

	const updateNotepadTitle = useCallback(
		(id: number, title: string) => {
			setNotepadItems((prev) =>
				prev.map((item) =>
					item.id === id && 'type' in item && item.type === 'title' ? { ...item, title } : item
				)
			);
		},
		[setNotepadItems]
	);

	const updateNotepadLineChord = useCallback(
		(lineId: number, slotIndex: number, chordId: number | null) => {
			const clampedSlot = Math.max(0, Math.min(59, slotIndex));
			setNotepadItems((prev) =>
				prev.map((item) => {
					if (item.id === lineId && 'chords' in item) {
						const existing = item.chords ?? [];
						const newChords = Array.from({ length: 60 }, (_, i) =>
							i === clampedSlot ? chordId : (existing[i] ?? null)
						);
						return { ...item, chords: newChords };
					}
					return item;
				})
			);
		},
		[setNotepadItems]
	);

	const reorderNotepadItems = useCallback(
		(fromIndex: number, toIndex: number) => {
			setNotepadItems((prev) => {
				const next = [...prev];
				const [moved] = next.splice(fromIndex, 1);
				next.splice(toIndex, 0, moved);
				return next;
			});
		},
		[setNotepadItems]
	);

	// Import operations
	const importChordBin = useCallback(
		(items: ChordBinItemData[]) => {
			setChordBinItems(items);
		},
		[setChordBinItems]
	);

	const importNotepad = useCallback(
		(items: NotepadItemData[]) => {
			const migrated = items.map((item) => {
				if ('type' in item && item.type === 'title') return item;
				const line = item as NotepadLineData & { content?: string };
				const text =
					'text' in line && line.text !== undefined
						? line.text
						: ((line as { content?: string }).content ?? '');
				const chords =
					!line.chords || line.chords.length !== 60
						? (() => {
								const existing = line.chords ?? [];
								const next = Array(60).fill(null) as (number | null)[];
								for (let i = 0; i < Math.min(60, existing.length); i++) next[i] = existing[i];
								return next;
							})()
						: line.chords;
				return { id: line.id, text, chords };
			});
			setNotepadItems(migrated);
		},
		[setNotepadItems]
	);

	const importAll = useCallback(
		(data: { chordBin: ChordBinItemData[]; notepad: NotepadItemData[] }) => {
			setChordBinItems(data.chordBin);
			const migrated = data.notepad.map((item) => {
				if ('type' in item && item.type === 'title') return item;
				const line = item as NotepadLineData & { content?: string };
				const text =
					'text' in line && line.text !== undefined
						? line.text
						: ((line as { content?: string }).content ?? '');
				const chords =
					!line.chords || line.chords.length !== 60
						? (() => {
								const existing = line.chords ?? [];
								const next = Array(60).fill(null) as (number | null)[];
								for (let i = 0; i < Math.min(60, existing.length); i++) next[i] = existing[i];
								return next;
							})()
						: line.chords;
				return { id: line.id, text, chords };
			});
			setNotepadItems(migrated);
		},
		[setChordBinItems, setNotepadItems]
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
		const data = { notepad: notepadItems };
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `notepad-${Date.now()}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [notepadItems]);

	const exportAll = useCallback(() => {
		const data = { chordBin: chordBinItems, notepad: notepadItems };
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `music-be-simple-${Date.now()}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [chordBinItems, notepadItems]);

	// Other operations
	const toggleReferenceMode = useCallback(() => {
		setReferenceMode((prev: ReferenceMode) => (prev === 'Scales' ? 'Chords' : 'Scales'));
	}, [setReferenceMode]);

	const reset = useCallback(() => {
		setChordBinItems([]);
		setNotepadItems([]);
	}, [setChordBinItems, setNotepadItems]);

	// Context value
	const contextValue = useMemo(
		() => ({
			activeInstrument,
			addChordBinItem,
			addNotepadLine,
			addNotepadTitle,
			chordBinItems,
			editingItemId,
			exportAll,
			exportChordBin,
			exportNotepad,
			importAll,
			importChordBin,
			importNotepad,
			notepadItems,
			referenceMode,
			removeChordBinItem,
			removeNotepadItem,
			reorderChordBinItems,
			reorderNotepadItems,
			reset,
			setActiveInstrument,
			setEditingItemId,
			toggleReferenceMode,
			updateChordBinItem,
			updateNotepadLine,
			updateNotepadTitle,
			updateNotepadLineChord,
		}),
		[
			activeInstrument,
			addChordBinItem,
			addNotepadLine,
			addNotepadTitle,
			chordBinItems,
			editingItemId,
			exportAll,
			exportChordBin,
			exportNotepad,
			importAll,
			importChordBin,
			importNotepad,
			notepadItems,
			referenceMode,
			removeChordBinItem,
			removeNotepadItem,
			reorderChordBinItems,
			reorderNotepadItems,
			reset,
			setActiveInstrument,
			toggleReferenceMode,
			updateChordBinItem,
			updateNotepadLine,
			updateNotepadTitle,
			updateNotepadLineChord,
		]
	);

	return <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>;
};
