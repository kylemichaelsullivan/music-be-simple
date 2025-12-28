import NavTab from '@/components/nav/NavTab';
import { TABS } from '@/navigation';
import type { TabType } from '@/types';

export default function Navbar() {
	const tabToRoute = (tab: TabType) => {
		return `/${tab.toLowerCase().replace(' ', '-')}`;
	};

	return (
		<nav className='Navbar flex flex-col gap-4 border-b p-4 sm:flex-row sm:pb-0'>
			{TABS.map((tab: TabType) => (
				<NavTab to={tabToRoute(tab)} title={tab} key={tab} />
			))}
		</nav>
	);
}
