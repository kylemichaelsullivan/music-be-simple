import { RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

function AllTheProviders({ children }: { children: ReactNode }) {
	const rootRoute = createRootRoute();
	const indexRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/',
		component: () => children,
	});
	const chordsRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/chords',
		component: () => children,
	});
	const scalesRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/scales',
		component: () => children,
	});
	const playRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/play',
		component: () => children,
	});

	const router = createRouter({
		routeTree: rootRoute.addChildren([indexRoute, chordsRoute, scalesRoute, playRoute]),
		defaultPreload: 'intent',
	});

	return <RouterProvider router={router} />;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
