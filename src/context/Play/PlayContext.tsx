import type { PlayContextType } from '@/types/play';
import { createContext } from 'react';

export const PlayContext = createContext<PlayContextType | undefined>(undefined);
