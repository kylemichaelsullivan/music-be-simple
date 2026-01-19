import { useButtonHandler } from '@/hooks';
import { type RefObject, useEffect } from 'react';
import xIcon from '/icons/x.svg';

type CloseButtonProps<T extends HTMLElement = HTMLElement> = {
	onFxn: () => void;
	containerRef?: RefObject<T | null>;
};

export function CloseButton<T extends HTMLElement = HTMLElement>({
	onFxn,
	containerRef,
}: CloseButtonProps<T>) {
	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);

	useEffect(() => {
		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onFxn();
			}
		};

		window.addEventListener('keydown', handleEscapeKey);

		return () => {
			window.removeEventListener('keydown', handleEscapeKey);
		};
	}, [onFxn]);

	useEffect(() => {
		if (!containerRef) return;

		const handleClickOutside = (e: MouseEvent) => {
			const node = e.target instanceof Node ? e.target : null;
			if (containerRef.current && !containerRef.current.contains(node)) {
				onFxn();
			}
		};

		// Use capture phase to ensure we catch the event before it bubbles
		document.addEventListener('mousedown', handleClickOutside, true);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside, true);
		};
	}, [onFxn, containerRef]);

	return (
		<button
			type='button'
			className='CloseButton absolute flex items-center justify-center border rounded-sm w-8 h-8 p-2 top-1 right-1 opacity-65 hover:opacity-100'
			title='Close'
			aria-label='Close'
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<img src={xIcon} alt='Close' className='w-full h-full' />
		</button>
	);
}
