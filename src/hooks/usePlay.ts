import { PlayContext } from '@/context/Play/PlayContext';
import type { PlayContextType } from '@/types';
import { useContext } from 'react';

export const usePlay = (): PlayContextType => {
	const context = useContext(PlayContext);
	if (context === undefined) {
		throw new Error('usePlay must be used within a PlayContextProvider');
	}
	return context;
};
