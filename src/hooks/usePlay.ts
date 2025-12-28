import { PlayContext } from '@/context';
import type { PlayContextType } from '@/types/play';
import { useContext } from 'react';

export const usePlay = (): PlayContextType => {
	const context = useContext(PlayContext);
	if (context === undefined) {
		throw new Error('usePlay must be used within a PlayContextProvider');
	}
	return context;
};
