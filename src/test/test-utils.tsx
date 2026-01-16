import { ChordsContextProvider, GlobalsContextProvider, PlayContextProvider, ScalesContextProvider } from '@/context';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

function AllTheProviders({ children }: { children: ReactNode }) {
	return (
		<GlobalsContextProvider>
			<ScalesContextProvider>
				<ChordsContextProvider>
					<PlayContextProvider>
						{children}
					</PlayContextProvider>
				</ChordsContextProvider>
			</ScalesContextProvider>
		</GlobalsContextProvider>
	);
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
