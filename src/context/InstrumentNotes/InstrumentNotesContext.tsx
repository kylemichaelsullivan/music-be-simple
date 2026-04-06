import { createContext } from 'react';
import type { InstrumentNotesContextType } from '@/types';

export const InstrumentNotesContext = createContext<InstrumentNotesContextType | undefined>(
	undefined
);
