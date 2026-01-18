import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/nav';
import {
	ChordsContextProvider,
	GlobalsContextProvider,
	PlayContextProvider,
	ScalesContextProvider,
} from '@/context';
import { TABS } from '@/navigation';
import type { TabType } from '@/types';
import type { ComponentType, LazyExoticComponent, ReactElement } from 'react';
import {
	Suspense,
	lazy,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	useTransition,
} from 'react';

const ChordsPage = lazy(() => import('@/pages/Chords').then((m) => ({ default: m.Chords })));
const PlayPage = lazy(() => import('@/pages/Play').then((m) => ({ default: m.Play })));
const ScalesPage = lazy(() => import('@/pages/Scales').then((m) => ({ default: m.Scales })));

const tabPageComponents: Record<TabType, LazyExoticComponent<ComponentType>> = {
	Scales: ScalesPage,
	Chords: ChordsPage,
	Play: PlayPage,
};

const TAB_ROUTES: Record<TabType, string> = {
	Scales: '/scales',
	Chords: '/chords',
	Play: '/play',
};

const PATHNAME_TO_TAB: Record<string, TabType> = {
	'/scales': 'Scales',
	'/chords': 'Chords',
	'/play': 'Play',
};

function getPathnameForTab(tab: TabType): string {
	return TAB_ROUTES[tab];
}

function getTabForPathname(pathname: string): TabType | null {
	return PATHNAME_TO_TAB[pathname] || null;
}

function getCurrentTabFromUrl(): TabType {
	const pathname = window.location.pathname;
	const tab = getTabForPathname(pathname);
	return tab || 'Scales';
}

function updateUrlForTab(tab: TabType, replace = false) {
	const pathname = getPathnameForTab(tab);
	const method = replace ? 'replaceState' : 'pushState';
	window.history[method]({ tab }, '', pathname);
	window.dispatchEvent(new PopStateEvent('popstate'));
}

function ActiveTabWrapper({
	children,
	onLoad,
}: {
	children: ReactElement;
	onLoad: () => void;
}) {
	useEffect(() => {
		onLoad();
	}, [onLoad]);

	return children;
}

export function App() {
	const initialTab = getCurrentTabFromUrl();
	const [activeTab, setActiveTab] = useState<TabType>(initialTab);
	const [shouldPreloadOtherTabs, setShouldPreloadOtherTabs] = useState(false);
	const hasPreloadedRef = useRef(false);
	const [, startTransition] = useTransition();

	useEffect(() => {
		if (window.location.pathname === '/') {
			updateUrlForTab('Scales', true);
		}
	}, []);

	useEffect(() => {
		const handleBrowserNavigation = () => {
			const tabFromUrl = getCurrentTabFromUrl();
			startTransition(() => {
				setActiveTab(tabFromUrl);
			});
		};

		window.addEventListener('popstate', handleBrowserNavigation);
		return () => window.removeEventListener('popstate', handleBrowserNavigation);
	}, []);

	const handleActiveTabLoaded = useCallback(() => {
		if (hasPreloadedRef.current) return;
		hasPreloadedRef.current = true;
		setShouldPreloadOtherTabs(true);
	}, []);

	const handleTabChange = useCallback(
		(newTab: TabType) => {
			if (newTab === activeTab) return;

			startTransition(() => {
				setActiveTab(newTab);
			});

			requestAnimationFrame(() => {
				updateUrlForTab(newTab);
				window.scrollTo({ top: 0, behavior: 'instant' });

				const focusElement = () => {
					const mainElement = document.querySelector(`main.${newTab}`) as HTMLElement;
					if (mainElement) {
						mainElement.focus();
					}
				};

				if ('requestIdleCallback' in window) {
					requestIdleCallback(focusElement);
				} else {
					setTimeout(focusElement, 0);
				}
			});
		},
		[activeTab]
	);

	const otherTabs = useMemo(() => TABS.filter((tab) => tab !== activeTab), [activeTab]);

	const ActivePageComponent = tabPageComponents[activeTab];

	return (
		<GlobalsContextProvider>
			<ScalesContextProvider>
				<ChordsContextProvider>
					<PlayContextProvider>
						<div className='RootComponent flex flex-col min-h-screen w-full overflow-x-hidden'>
							<Navbar currentTab={activeTab} onTabChange={handleTabChange} />
							<div className='ScrollSnap flex flex-col flex-1 scroll-snap-align-start w-full'>
								<div className='relative flex flex-1 min-w-0 min-h-0'>
									<Suspense
										fallback={
											<div className='flex flex-1 justify-center items-center p-4'>
												Loading . . .
											</div>
										}
									>
										<ActiveTabWrapper onLoad={handleActiveTabLoaded}>
											<ActivePageComponent />
										</ActiveTabWrapper>
									</Suspense>
									{shouldPreloadOtherTabs && (
										<Suspense fallback={null}>
											{otherTabs.map((tab) => {
												const PageComponent = tabPageComponents[tab];
												return (
													<div
														key={tab}
														className='absolute inset-0 z-0 pointer-events-none opacity-0 overflow-hidden'
														style={{ contain: 'layout' }}
														aria-hidden={true}
													>
														<PageComponent />
													</div>
												);
											})}
										</Suspense>
									)}
								</div>
								<Footer />
							</div>
						</div>
					</PlayContextProvider>
				</ChordsContextProvider>
			</ScalesContextProvider>
		</GlobalsContextProvider>
	);
}
