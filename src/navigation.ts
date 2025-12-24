import { z } from 'zod';

export const TABS = ['Chords', 'Scales', 'Write'] as const;

export const TabSchema = z.enum(TABS);
