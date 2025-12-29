import type { ChordsContextType } from '@/types';
import { createContext } from 'react';

export const ChordsContext = createContext<ChordsContextType | undefined>(undefined);
