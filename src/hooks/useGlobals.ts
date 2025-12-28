import { GlobalsContext } from '@/context';
import type { GlobalsContextType } from '@/types/globals';
import { useContext } from 'react';

export const useGlobals = (): GlobalsContextType => {
	const context = useContext(GlobalsContext);
	if (context === undefined) {
		throw new Error('useGlobals must be used within a GlobalsContextProvider');
	}
	return context;
};
