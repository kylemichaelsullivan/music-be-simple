import { useContext } from 'react';
import { ScalesContext } from '@/context';
import type { ScalesContextType } from '@/types';

export const useScales = (): ScalesContextType => {
	const context = useContext(ScalesContext);
	if (context === undefined) {
		throw new Error('useScales must be used within a ScalesContextProvider');
	}
	return context;
};
