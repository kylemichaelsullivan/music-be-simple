import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { NavTab } from '../nav/NavTab';

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();
Element.prototype.scrollIntoView = mockScrollIntoView;

describe('NavTab', () => {
	it('should render nav tab with title', async () => {
		render(<NavTab title='Chords' to='/chords' />);

		await waitFor(() => {
			const link = screen.getByTitle('Chords');
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', '/chords');
		});
	});

	it('should display title text', async () => {
		render(<NavTab title='Scales' to='/scales' />);

		await waitFor(() => {
			expect(screen.getByText('Scales')).toBeInTheDocument();
		});
	});

	it('should have correct title attribute', async () => {
		render(<NavTab title='Play' to='/play' />);

		await waitFor(() => {
			const link = screen.getByTitle('Play');
			expect(link).toHaveAttribute('title', 'Play');
		});
	});

	it('should have NavTab class', async () => {
		render(<NavTab title='Chords' to='/chords' />);

		await waitFor(() => {
			const link = screen.getByTitle('Chords');
			expect(link).toHaveClass('NavTab');
		});
	});

	it('should scroll to main element on click', async () => {
		const user = userEvent.setup();

		// Create a main element with the correct class name matching the title
		const mainElement = document.createElement('main');
		mainElement.className = 'Chords';
		document.body.appendChild(mainElement);

		render(<NavTab title='Chords' to='/chords' />);

		await waitFor(() => {
			expect(screen.getByTitle('Chords')).toBeInTheDocument();
		});

		const link = screen.getByTitle('Chords');
		await user.click(link);

		expect(mockScrollIntoView).toHaveBeenCalledWith({
			behavior: 'smooth',
			block: 'start',
		});

		// Cleanup
		document.body.removeChild(mainElement);
	});

	it('should not throw error if main element does not exist', async () => {
		const user = userEvent.setup();

		// Ensure no main element exists
		const existingMain = document.querySelector('main');
		if (existingMain) {
			document.body.removeChild(existingMain);
		}

		render(<NavTab title='Chords' to='/chords' />);

		await waitFor(async () => {
			const link = screen.getByTitle('Chords');
			// Should not throw error
			await expect(user.click(link)).resolves.not.toThrow();
		});
	});

	it('should render different tabs correctly', async () => {
		render(
			<>
				<NavTab title='Chords' to='/chords' />
				<NavTab title='Scales' to='/scales' />
				<NavTab title='Play' to='/play' />
			</>
		);

		await waitFor(() => {
			expect(screen.getByText('Chords')).toBeInTheDocument();
			expect(screen.getByText('Scales')).toBeInTheDocument();
			expect(screen.getByText('Play')).toBeInTheDocument();
		});
	});
});
