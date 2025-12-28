import type { IconType } from '@/instruments';
import type { ReactNode } from 'react';

export type GlobalsContextType = {
	usingFlats: boolean;
	displays: IconType[];
	showNerdMode: boolean;
	toggleUsingFlats: () => void;
	handleDisplaysClick: (icon: IconType) => void;
	toggleShowNerdMode: () => void;
	getNote: (note: number) => string;
	capitalizeFirstLetter: (string: string) => string;
};

export type GlobalsContextProviderProps = {
	children: ReactNode;
};
