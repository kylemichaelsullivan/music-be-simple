import type { ScalesContextType } from '@/types';
import { createContext } from 'react';

export const ScalesContext = createContext<ScalesContextType | undefined>(undefined);
