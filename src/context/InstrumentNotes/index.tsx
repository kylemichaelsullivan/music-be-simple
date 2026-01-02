import type { border } from '@/types';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { InstrumentNotesContext } from './InstrumentNotesContext';
import type { InstrumentNotesContextType } from './InstrumentNotesContext';

type InstrumentNotesProviderProps = {
	children: ReactNode;
	notes: number[];
	tonic: number;
	showNoteLabels?: boolean;
	getBorderStyle?: (note: number) => border;
};

export function InstrumentNotesProvider({
	children,
	notes,
	tonic,
	showNoteLabels = true,
	getBorderStyle,
}: InstrumentNotesProviderProps) {
	const value: InstrumentNotesContextType = useMemo(
		() => ({ notes, tonic, showNoteLabels, getBorderStyle }),
		[notes, tonic, showNoteLabels, getBorderStyle]
	);
	return (
		<InstrumentNotesContext.Provider value={value}>{children}</InstrumentNotesContext.Provider>
	);
}

export { InstrumentNotesContext, type InstrumentNotesContextType } from './InstrumentNotesContext';
