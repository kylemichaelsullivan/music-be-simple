import { NavIcon } from '@/components/icons';
import type { TabType } from '@/types';
import { Link } from '@tanstack/react-router';

type NavTabProps = {
	title: TabType;
	to: string;
};

export function NavTab({ title, to }: NavTabProps) {
	const handleClick = () => {
		const mainElement = document.querySelector('main');
		if (mainElement) {
			mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<Link
			to={to}
			className='NavTab flex flex-1 justify-center gap-2 items-center border border-gray-500 rounded-lg transition-colors px-4 py-2 hover:bg-gray-100 sm:border-b-0 sm:rounded-b-none'
			activeProps={{ className: 'bg-gray-300 font-bold' }}
			title={title}
			onClick={handleClick}
		>
			<NavIcon name={title} />
			<span>{title}</span>
		</Link>
	);
}
