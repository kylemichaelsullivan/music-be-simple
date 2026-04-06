import { createContext } from 'react';
import type { PlayContextType } from '@/types';

export const PlayContext = createContext<PlayContextType | undefined>(undefined);
