import { NavIcon } from '@/components/nav';
import type { TabType } from '@/types';
import { Link } from '@tanstack/react-router';

type NavTabProps = {
	title: TabType;
	to: string;
};

export default function NavTab({ title, to }: NavTabProps) {
	return (
		<Link
			to={to}
			className='NavTab flex flex-1 justify-center gap-2 items-center border border-gray-500 rounded-lg transition-colors px-4 py-2 hover:bg-gray-100 sm:border-b-0 sm:rounded-b-none'
			activeProps={{ className: 'bg-gray-300 font-bold' }}
			title={title}
		>
			<NavIcon name={title} />
			<span>{title}</span>
		</Link>
	);
}
