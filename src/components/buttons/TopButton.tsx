import { useButtonHandler } from '@/hooks';
import type { XPositionType } from '@/types';
import type { ReactNode } from 'react';

type TopButtonProps = {
	title: string;
	icon: string | ReactNode;
	position: XPositionType;
	onFxn: () => void;
};

export function TopButton({ title, icon, position, onFxn }: TopButtonProps) {
	const ComponentTitle = title.replace(/[\s?]/g, '');
	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);

	// ensure Tailwind classes are compiled
	const positionX = position === 'left' ? 'left-0' : 'right-0';

	return (
		<button
			type='button'
			className={`${ComponentTitle} absolute flex items-center justify-center bg-slate-200 border border-slate-500 text-xl w-12 h-12 top-0 ${positionX} hover:ring-1`}
			title={title}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{icon}
		</button>
	);
}
