import type { NoteIndex, border } from '@/types';
import { createContext } from 'react';

export type InstrumentNotesContextType = {
	notes: NoteIndex[];
	tonic: NoteIndex;
	showNoteLabels?: boolean;
	getBorderStyle?: (note: NoteIndex) => border;
	showNerdMode?: boolean;
};

export const InstrumentNotesContext = createContext<InstrumentNotesContextType | undefined>(
	undefined
);
