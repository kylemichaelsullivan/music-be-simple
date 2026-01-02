import type { NoteIndex, border } from '@/types';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { InstrumentNotesContext } from './InstrumentNotesContext';
import type { InstrumentNotesContextType } from './InstrumentNotesContext';

type InstrumentNotesProviderProps = {
	children: ReactNode;
	notes: NoteIndex[];
	tonic: NoteIndex;
	showNoteLabels?: boolean;
	getBorderStyle?: (note: NoteIndex) => border;
	showNerdMode?: boolean;
};

export function InstrumentNotesProvider({
	children,
	notes,
	tonic,
	showNoteLabels = true,
	getBorderStyle,
	showNerdMode,
}: InstrumentNotesProviderProps) {
	const value: InstrumentNotesContextType = useMemo(
		() => ({ notes, tonic, showNoteLabels, getBorderStyle, showNerdMode }),
		[notes, tonic, showNoteLabels, getBorderStyle, showNerdMode]
	);
	return (
		<InstrumentNotesContext.Provider value={value}>{children}</InstrumentNotesContext.Provider>
	);
}

export { InstrumentNotesContext, type InstrumentNotesContextType } from './InstrumentNotesContext';
