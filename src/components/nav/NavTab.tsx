import { NavIcon } from '@/components/icons';
import { useButtonHandler } from '@/hooks';
import type { TabType } from '@/types';
import { memo } from 'react';

type NavTabProps = {
	title: TabType;
	isActive: boolean;
	onFxn: () => void;
};

function NavTabComponent({ title, isActive, onFxn }: NavTabProps) {
	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);

	return (
		<button
			type='button'
			className={`NavTab flex flex-1 justify-center gap-2 items-center border border-gray-500 rounded-lg transition-colors px-4 py-2 hover:bg-gray-100 sm:border-b-0 sm:rounded-b-none ${isActive ? 'bg-gray-300 font-bold' : ''}`}
			title={title}
			aria-current={isActive ? 'page' : undefined}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<NavIcon name={title} />
			<span>{title}</span>
		</button>
	);
}

export const NavTab = memo(NavTabComponent);
