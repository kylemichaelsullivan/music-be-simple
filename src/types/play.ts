import type { ReactNode } from 'react';

// keyWord
export type PlayContextType = Record<string, never>;

export type PlayContextProviderProps = {
	children: ReactNode;
};
