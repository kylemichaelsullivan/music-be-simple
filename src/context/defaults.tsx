import { ICON_MAP } from '@/instruments';
import type {
	Chord_Tonic,
	Chord_UsingFlats,
	Chord_Variant,
	IconType,
	InstrumentType,
} from '@/types';

/** Subset of `INSTRUMENT_ORDER`: Banjo and Mandolin are opt-in via the display strip. */
const DEFAULT_INSTRUMENTS: InstrumentType[] = ['Piano', 'Guitar', 'Ukulele'];

export const initialTonic: Chord_Tonic = 0;
export const initialVariant: Chord_Variant = 'major';
export const initialUsingFlats: Chord_UsingFlats = true;
export const initialDisplays: IconType[] = DEFAULT_INSTRUMENTS.map(
	(instrument) => ICON_MAP[instrument]
);
export const initialShowNerdMode = true;
