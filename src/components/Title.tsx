import type { KeyboardEvent, MouseEvent } from 'react';
import { NavIcon } from '@/components';
import type { TabType } from '@/types';

type TitleProps = {
	actionLabel?: string;
	onTitleClick?: () => void;
	title: TabType;
};

export function Title({ actionLabel, onTitleClick, title }: TitleProps) {
	const interactive = Boolean(onTitleClick);

	const handleKeyDown = (e: KeyboardEvent<HTMLHeadingElement>) => {
		if (!onTitleClick) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onTitleClick();
		}
	};

	const handleClick = (e: MouseEvent<HTMLHeadingElement>) => {
		if (!onTitleClick) return;
		e.preventDefault();
		onTitleClick();
	};

	return (
		<h1
			aria-label={interactive ? actionLabel : undefined}
			className={
				interactive
					? 'Title flex justify-center items-center gap-2 text-2xl font-bold text-center cursor-pointer select-none hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
					: 'Title flex justify-center items-center gap-2 text-2xl font-bold text-center'
			}
			role={interactive ? 'button' : undefined}
			title={interactive ? actionLabel : undefined}
			tabIndex={interactive ? 0 : undefined}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<NavIcon name={title} />
			{title}
		</h1>
	);
}
