import { InstrumentNotesProvider } from '@/context';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Key } from '../Key';

function wrap(ui: React.ReactElement) {
	return (
		<InstrumentNotesProvider notes={[0, 2, 4, 5, 7, 9, 11]} tonic={0}>
			{ui}
		</InstrumentNotesProvider>
	);
}

describe('Key', () => {
	it('should render with note name as title', () => {
		render(wrap(<Key note={0} isBlack={false} isAllowed={true} />));
		expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
	});

	it('should apply black or white class', () => {
		render(wrap(<Key note={0} isBlack={true} isAllowed={false} />));
		expect(screen.getByRole('button', { name: 'C' })).toHaveClass('black');
		render(wrap(<Key note={2} isBlack={false} isAllowed={false} />));
		expect(screen.getByRole('button', { name: 'D' })).toHaveClass('white');
	});

	it('should be clickable without throwing', async () => {
		const user = userEvent.setup();
		render(wrap(<Key note={4} isBlack={false} isAllowed={true} />));
		await user.click(screen.getByRole('button', { name: 'E' }));
	});
});
