import { useContext } from 'react';
import { TuningsContext } from '@/context';
import type { TuningsContextType } from '@/types';

export const useTunings = (): TuningsContextType => {
	const context = useContext(TuningsContext);
	if (context === undefined) {
		throw new Error('useTunings must be used within a TuningsContextProvider');
	}
	return context;
};
