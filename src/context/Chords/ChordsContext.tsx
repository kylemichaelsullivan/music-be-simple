import type { ChordsContextType } from '@/types/chords';
import { createContext } from 'react';

export const ChordsContext = createContext<ChordsContextType | undefined>(undefined);
