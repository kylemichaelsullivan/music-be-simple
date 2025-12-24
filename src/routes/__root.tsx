import { TABS } from '@/navigation';
import type { TabType } from '@/types';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const tabToRoute = (tab: TabType) => {
		return `/${tab.toLowerCase().replace(' ', '-')}`;
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<nav className='flex gap-4 p-4 border-b'>
				{TABS.map((tab: TabType) => (
					<Link
						to={tabToRoute(tab)}
						className='px-4 py-2 rounded hover:bg-gray-100'
						activeProps={{ className: 'font-bold' }}
						key={tab}
					>
						{tab}
					</Link>
				))}
			</nav>
			<main className='flex-1 p-4'>
				<Outlet />
			</main>
		</div>
	);
}
