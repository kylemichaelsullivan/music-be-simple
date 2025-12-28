import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { IconType } from '@/instruments';
import type { Chord_Tonic, Chord_UsingFlats, Chord_Variant } from '@/types';

export const initialTonic: Chord_Tonic = 0;
export const initialVariant: Chord_Variant = 'major';
export const initialUsingFlats: Chord_UsingFlats = true;
export const initialDisplays: IconType[] = INSTRUMENT_ORDER.map(
	(instrument) => ICON_MAP[instrument]
);
export const initialShowNerdMode = true;
