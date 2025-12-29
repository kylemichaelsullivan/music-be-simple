import type { GlobalsContextType } from '@/types';
import { useContext } from 'react';
import { GlobalsContext } from '../Globals';

export function useRequireGlobals(): GlobalsContextType {
	const globals = useContext(GlobalsContext);
	if (!globals) {
		throw new Error('This hook must be used within GlobalsContextProvider');
	}
	return globals;
}
