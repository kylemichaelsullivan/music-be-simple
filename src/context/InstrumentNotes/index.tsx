import type {
	InstrumentNotesContextType,
	InstrumentType,
	NoteIndex,
	border,
} from '@/types';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { InstrumentNotesContext } from '.';

type InstrumentNotesProviderProps = {
	tonic: NoteIndex;
	notes: NoteIndex[];
	children: ReactNode;
	getBorderStyle?: (note: NoteIndex, keyIndex?: number) => border;
	getNotesForInstrument?: (instrument: InstrumentType) => NoteIndex[];
	showNerdMode?: boolean;
	showNoteLabels?: boolean;
};

export function InstrumentNotesProvider({
	children,
	notes,
	tonic,
	showNoteLabels = true,
	getBorderStyle,
	getNotesForInstrument,
	showNerdMode,
}: InstrumentNotesProviderProps) {
	const value: InstrumentNotesContextType = useMemo(
		() => ({
			notes,
			tonic,
			showNoteLabels,
			getBorderStyle,
			getNotesForInstrument,
			showNerdMode,
		}),
		[notes, tonic, showNoteLabels, getBorderStyle, getNotesForInstrument, showNerdMode]
	);
	return (
		<InstrumentNotesContext.Provider value={value}>{children}</InstrumentNotesContext.Provider>
	);
}

export { InstrumentNotesContext } from './InstrumentNotesContext';
