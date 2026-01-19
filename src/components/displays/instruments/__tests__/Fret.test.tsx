import { InstrumentNotesProvider } from '@/context';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Fret } from '../Fret';

function wrap(ui: React.ReactElement) {
	return (
		<InstrumentNotesProvider notes={[0, 2, 4, 5, 7, 9, 11]} tonic={0}>
			{ui}
		</InstrumentNotesProvider>
	);
}

describe('Fret', () => {
	it('should render with note name as title', () => {
		render(wrap(<Fret note={0} />));
		expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
	});

	it('should be clickable without throwing', async () => {
		const user = userEvent.setup();
		render(wrap(<Fret note={4} />));
		await user.click(screen.getByRole('button', { name: 'E' }));
	});
});
