import { createContext } from 'react';
import type { GlobalsContextType } from '@/types';

export const GlobalsContext = createContext<GlobalsContextType | undefined>(undefined);
