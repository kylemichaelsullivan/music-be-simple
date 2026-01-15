import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/nav';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export function RootComponent() {
	return (
		<div className='RootComponent flex flex-col min-h-screen w-full overflow-x-hidden'>
			<Navbar />
			<div className='ScrollSnap flex flex-col scroll-snap-align-start w-full'>
				<Outlet />
				<Footer />
			</div>
		</div>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
