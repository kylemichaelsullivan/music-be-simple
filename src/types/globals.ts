import type { IconType } from '@/instruments';
import type { ReactNode } from 'react';

export type GlobalsContextType = {
	usingFlats: boolean;
	displays: IconType[];
	showNerdMode: boolean;
	toggleUsingFlats: () => void;
	handleDisplaysClick: (icon: IconType) => void;
	toggleShowNerdMode: () => void;
	capitalizeFirstLetter: (string: string) => string;
	getNote: (note: number) => string;
	playNote: (note: number) => void;
};

export type GlobalsContextProviderProps = {
	children: ReactNode;
};
