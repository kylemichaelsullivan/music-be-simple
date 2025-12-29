import type { PlayContextType } from '@/types';
import { createContext } from 'react';

export const PlayContext = createContext<PlayContextType | undefined>(undefined);
