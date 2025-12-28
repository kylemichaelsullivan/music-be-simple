import type { ScalesContextType } from '@/types/scales';
import { createContext } from 'react';

export const ScalesContext = createContext<ScalesContextType | undefined>(undefined);
