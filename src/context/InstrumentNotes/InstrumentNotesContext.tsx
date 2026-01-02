import type { border } from '@/types';
import { createContext } from 'react';

export type InstrumentNotesContextType = {
	notes: number[];
	tonic: number;
	showNoteLabels?: boolean;
	getBorderStyle?: (note: number) => border;
};

export const InstrumentNotesContext = createContext<InstrumentNotesContextType | undefined>(
	undefined
);
