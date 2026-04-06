import { useContext } from 'react';
import { ChordsContext } from '@/context';
import type { ChordsContextType } from '@/types';

export const useChords = (): ChordsContextType => {
	const context = useContext(ChordsContext);
	if (context === undefined) {
		throw new Error('useChords must be used within a ChordsContextProvider');
	}
	return context;
};
