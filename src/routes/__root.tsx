import Footer from '@/components/Footer';
import { Navbar } from '@/components/nav';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export default function RootComponent() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
