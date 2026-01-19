import { InstrumentNotesProvider } from '@/context';
import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { FretString } from '../FretString';

function wrap(ui: React.ReactElement) {
	return (
		<InstrumentNotesProvider notes={[0, 2, 4, 5, 7, 9, 11]} tonic={0}>
			{ui}
		</InstrumentNotesProvider>
	);
}

describe('FretString', () => {
	it('should render Nut and Frets', () => {
		render(wrap(<FretString openNote={4} />));
		// E string: Nut shows E (4), then F, F#, G, etc.
		expect(screen.getByRole('button', { name: 'E' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'F' })).toBeInTheDocument();
	});

	it('should have FretString class', () => {
		const { container } = render(wrap(<FretString openNote={0} />));
		expect(container.querySelector('.FretString')).toBeInTheDocument();
	});
});
