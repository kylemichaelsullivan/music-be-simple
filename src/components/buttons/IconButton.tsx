import { useButtonHandler } from '@/hooks';
import clsx from 'clsx';
import type { ReactNode } from 'react';

type IconButtonProps = {
	title: string;
	onFxn: () => void;
	children: ReactNode;
	className?: string;
};

export default function IconButton({ title, onFxn, className, children }: IconButtonProps) {
	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);

	return (
		<button
			type='button'
			className={clsx(className, 'grayscale transition-all opacity-100 hover:opacity-65')}
			title={title}
			aria-label={title}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{children}
		</button>
	);
}
