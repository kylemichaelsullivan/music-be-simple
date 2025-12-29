import type { GlobalsContextType } from '@/types';
import { createContext } from 'react';

export const GlobalsContext = createContext<GlobalsContextType | undefined>(undefined);
