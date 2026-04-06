import { createContext } from 'react';
import type { ChordsContextType } from '@/types';

export const ChordsContext = createContext<ChordsContextType | undefined>(undefined);
