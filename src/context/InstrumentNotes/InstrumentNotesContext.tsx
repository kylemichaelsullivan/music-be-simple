import type { InstrumentNotesContextType } from '@/types';
import { createContext } from 'react';

export const InstrumentNotesContext = createContext<InstrumentNotesContextType | undefined>(
	undefined
);
