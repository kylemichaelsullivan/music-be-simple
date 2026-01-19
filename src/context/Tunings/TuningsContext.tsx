import type { TuningsContextType } from '@/types';
import { createContext } from 'react';

export const TuningsContext = createContext<TuningsContextType | undefined>(undefined);
