import { AppProviders } from '@/context';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageLayout } from '../PageLayout';

describe('PageLayout', () => {
	it('should render without throwing', () => {
		expect(() =>
			render(
				<AppProviders>
					<PageLayout
						title='Scales'
						displaysProps={{ notes: [0, 2, 4, 5, 7, 9, 11], tonic: 0, showModes: true }}
						tonicVariantSlot={<div data-testid='tonic-variant'>Tonic</div>}
						topButton={{
							icon: <span>I</span>,
							title: 'Toggle',
							onFxn: () => {},
						}}
					/>
				</AppProviders>
			)
		).not.toThrow();
	});

	it('should render title and tonic slot', () => {
		render(
			<AppProviders>
				<PageLayout
					title='Chords'
					displaysProps={{ notes: [0, 4, 7], tonic: 0 }}
					tonicVariantSlot={<div data-testid='tonic-variant'>Chord</div>}
					topButton={{ icon: <span>I</span>, title: 'Btn', onFxn: () => {} }}
				/>
			</AppProviders>
		);
		expect(screen.getByTestId('tonic-variant')).toHaveTextContent('Chord');
	});
});
