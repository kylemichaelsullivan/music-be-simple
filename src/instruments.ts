import type { IconName, IconType, InstrumentType } from '@/types';

export const INSTRUMENTS = ['Banjo', 'Guitar', 'Mandolin', 'Piano', 'Ukulele'] as const;
export const ICONS = ['banjo', 'guitar', 'keyboard', 'mandolin', 'stand', 'ukulele'] as const;

export const INSTRUMENT_ORDER: InstrumentType[] = [
	'Piano',
	'Guitar',
	'Banjo',
	'Ukulele',
	'Mandolin',
];

export const ICON_MAP: Record<IconName, IconType> = {
	Banjo: 'banjo',
	Guitar: 'guitar',
	Mandolin: 'mandolin',
	Modes: 'stand',
	Piano: 'keyboard',
	Ukulele: 'ukulele',
} as const;
