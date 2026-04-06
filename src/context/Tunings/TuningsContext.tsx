import { createContext } from 'react';
import type { TuningsContextType } from '@/types';

export const TuningsContext = createContext<TuningsContextType | undefined>(undefined);
