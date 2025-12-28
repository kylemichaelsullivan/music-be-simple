import type { GlobalsContextType } from '@/types/globals';
import { createContext } from 'react';

export const GlobalsContext = createContext<GlobalsContextType | undefined>(undefined);
