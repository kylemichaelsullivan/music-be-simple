import type { IconType } from '@/types';
import type { ReactNode } from 'react';

export type GlobalsContextProviderProps = {
	children: ReactNode;
};

export type GlobalsContextType = {
	capitalizeFirstLetter: (string: string) => string;
	displays: IconType[];
	handleDisplaysClick: (icon: IconType) => void;
	playNote: (note: number) => void;
	toggleUsingFlats: () => void;
	usingFlats: boolean;
};
