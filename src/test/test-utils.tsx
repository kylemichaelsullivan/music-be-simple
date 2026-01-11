import { RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

// Helper function to render components with router context
function AllTheProviders({ children }: { children: React.ReactNode }) {
	const rootRoute = createRootRoute();
	const indexRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/',
		component: () => children as ReactElement,
	});
	const chordsRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/chords',
		component: () => children as ReactElement,
	});
	const scalesRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/scales',
		component: () => children as ReactElement,
	});
	const playRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/play',
		component: () => children as ReactElement,
	});

	const router = createRouter({
		routeTree: rootRoute.addChildren([indexRoute, chordsRoute, scalesRoute, playRoute]),
		defaultPreload: 'intent',
	});

	return <RouterProvider router={router} />;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
