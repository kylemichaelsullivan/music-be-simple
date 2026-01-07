import { NavTab } from '@/components/nav';
import { TABS } from '@/navigation';
import type { TabType } from '@/types';

export function Navbar() {
	const tabToRoute = (tab: TabType) => {
		return `/${tab.toLowerCase().replace(' ', '-')}`;
	};

	return (
		<nav className='Navbar flex flex-col gap-4 border-b p-4 sm:flex-row sm:pb-0 scroll-snap-align-start'>
			{TABS.map((tab: TabType) => (
				<NavTab to={tabToRoute(tab)} title={tab} key={tab} />
			))}
		</nav>
	);
}
