import { z } from 'zod';

export const TABS = ['Scales', 'Chords', 'Play'] as const;

export const TabSchema = z.enum(TABS);
