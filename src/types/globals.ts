import type { IconType } from '@/instruments';
import type { ReactNode } from 'react';

export type GlobalsContextType = {
	usingFlats: boolean;
	displays: IconType[];
	toggleUsingFlats: () => void;
	handleDisplaysClick: (icon: IconType) => void;
	capitalizeFirstLetter: (string: string) => string;
	playNote: (note: number) => void;
};

export type GlobalsContextProviderProps = {
	children: ReactNode;
};
