import { useContext } from 'react';
import { InstrumentNotesContext } from '@/context';

export function useInstrumentNotes() {
	const context = useContext(InstrumentNotesContext);
	if (context === undefined) {
		throw new Error('useInstrumentNotes must be used within an InstrumentNotesProvider');
	}
	return context;
}
