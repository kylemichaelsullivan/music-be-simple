import { TABS } from '@/navigation';
import type { TabType } from '@/types';
import { useMemo } from 'react';
import { NavTab } from './';

type NavbarProps = {
	currentTab: TabType;
	onTabChange: (tab: TabType) => void;
};

export function Navbar({ currentTab, onTabChange }: NavbarProps) {
	const tabItems = useMemo(
		() =>
			TABS.map((tab: TabType) => (
				<NavTab
					title={tab}
					isActive={currentTab === tab}
					onFxn={() => onTabChange(tab)}
					key={tab}
				/>
			)),
		[currentTab, onTabChange]
	);

	return (
		<nav className='Navbar scroll-snap-align-start flex flex-col gap-4 border-b p-4 sm:flex-row sm:pb-0'>
			{tabItems}
		</nav>
	);
}
