import { createContext } from 'react';
import type { ScalesContextType } from '@/types';

export const ScalesContext = createContext<ScalesContextType | undefined>(undefined);
