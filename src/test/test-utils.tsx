import { RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';

// Helper function to render components with router context
function AllTheProviders({ children }: { children: React.ReactNode }) {
	const rootRoute = createRootRoute();
	const indexRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/',
		component: () => children as ReactElement,
	});

	const router = createRouter({
		routeTree: rootRoute.addChildren([indexRoute]),
		defaultPreload: 'intent',
	});

	return <RouterProvider router={router} />;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
