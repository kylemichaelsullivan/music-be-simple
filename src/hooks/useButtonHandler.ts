import type { KeyboardEvent } from 'react';
import { useCallback } from 'react';

export const useButtonHandler = (onFxn: () => void) => {
	const handleClick = useCallback(() => {
		onFxn();
	}, [onFxn]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onFxn();
			}
		},
		[onFxn]
	);

	const handleKeyUp = handleKeyDown;

	return { handleClick, handleKeyDown, handleKeyUp };
};
