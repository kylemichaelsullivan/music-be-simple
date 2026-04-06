import type { ReactNode } from 'react';
import type { IconType, PositionType } from '@/types';

export type GlobalsContextProviderProps = {
	children: ReactNode;
};

export type GlobalsContextType = {
	capitalizeFirstLetter: (string: string) => string;
	displays: IconType[];
	displaysSelectorPosition: PositionType;
	handleDisplaysClick: (icon: IconType) => void;
	handleDisplaysSelectorMove: (direction: PositionType) => void;
	playNote: (note: number) => void;
	toggleUsingFlats: () => void;
	usingFlats: boolean;
};
