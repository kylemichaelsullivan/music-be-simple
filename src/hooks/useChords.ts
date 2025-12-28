import { ChordsContext } from '@/context';
import type { ChordsContextType } from '@/types/chords';
import { useContext } from 'react';

export const useChords = (): ChordsContextType => {
	const context = useContext(ChordsContext);
	if (context === undefined) {
		throw new Error('useChords must be used within a ChordsContextProvider');
	}
	return context;
};
