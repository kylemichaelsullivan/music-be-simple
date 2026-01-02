import type { PlayContextProviderProps } from '@/types';
import { useMemo } from 'react';
import { useRequireGlobals } from '../shared/useRequireGlobals';
import { PlayContext } from './PlayContext';

export { PlayContext };

export const PlayContextProvider = ({ children }: PlayContextProviderProps) => {
	useRequireGlobals();

	const contextValue = useMemo(() => ({}), []);

	return <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>;
};
