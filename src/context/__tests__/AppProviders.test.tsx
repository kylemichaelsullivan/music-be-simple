import { AppProviders } from '@/context';
import { useGlobals, useTunings } from '@/hooks';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

function ContextConsumer() {
	useGlobals();
	useTunings();
	return <span>Providers OK</span>;
}

describe('AppProviders', () => {
	it('should render children without throwing when context is consumed', () => {
		render(
			<AppProviders>
				<ContextConsumer />
			</AppProviders>
		);
		expect(screen.getByText('Providers OK')).toBeInTheDocument();
	});

	it('should provide Globals and Tunings to descendants', () => {
		function Consumer() {
			const { usingFlats } = useGlobals();
			const { getTuning } = useTunings();
			const guitar = getTuning('Guitar');
			return (
				<span data-testid='out'>
					{usingFlats ? 'flats' : 'sharps'}-{guitar.length} strings
				</span>
			);
		}
		render(
			<AppProviders>
				<Consumer />
			</AppProviders>
		);
		expect(screen.getByTestId('out')).toHaveTextContent(/6 strings/);
	});
});
