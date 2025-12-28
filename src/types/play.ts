import type { ReactNode } from 'react';

export type PlayContextType = {
	playNote: (note: number) => void;
};

export type PlayContextProviderProps = {
	children: ReactNode;
};
