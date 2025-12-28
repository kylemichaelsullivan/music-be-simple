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
			className='flex-1 border border-gray-500 rounded-lg transition-colors px-4 py-2 hover:bg-gray-100 sm:border-b-0 sm:rounded-b-none'
			activeProps={{ className: 'bg-gray-300 font-bold' }}
			title={title}
		>
			{title}
		</Link>
	);
}
