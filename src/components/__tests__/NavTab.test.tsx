import { NavTab } from '@/components/nav';
import { render, screen, waitFor } from '@/test';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('NavTab', () => {
	it('should render nav tab with title', async () => {
		const mockOnClick = vi.fn();
		render(<NavTab title='Chords' isActive={false} onFxn={mockOnClick} />);

		await waitFor(() => {
			const button = screen.getByTitle('Chords');
			expect(button).toBeInTheDocument();
			expect(button).toHaveAttribute('type', 'button');
		});
	});

	it('should display title text', async () => {
		const mockOnClick = vi.fn();
		render(<NavTab title='Scales' isActive={false} onFxn={mockOnClick} />);

		await waitFor(() => {
			expect(screen.getByText('Scales')).toBeInTheDocument();
		});
	});

	it('should have correct title attribute', async () => {
		const mockOnClick = vi.fn();
		render(<NavTab title='Play' isActive={false} onFxn={mockOnClick} />);

		await waitFor(() => {
			const button = screen.getByTitle('Play');
			expect(button).toHaveAttribute('title', 'Play');
		});
	});

	it('should have NavTab class', async () => {
		const mockOnClick = vi.fn();
		render(<NavTab title='Chords' isActive={false} onFxn={mockOnClick} />);

		await waitFor(() => {
			const button = screen.getByTitle('Chords');
			expect(button).toHaveClass('NavTab');
		});
	});

	it('should call onFxn when clicked', async () => {
		const user = userEvent.setup();
		const mockOnClick = vi.fn();

		render(<NavTab title='Chords' isActive={false} onFxn={mockOnClick} />);

		await waitFor(() => {
			expect(screen.getByTitle('Chords')).toBeInTheDocument();
		});

		const button = screen.getByTitle('Chords');
		await user.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should apply active styles when isActive is true', async () => {
		const mockOnClick = vi.fn();
		render(<NavTab title='Chords' isActive={true} onFxn={mockOnClick} />);

		await waitFor(() => {
			const button = screen.getByTitle('Chords');
			expect(button).toHaveClass('bg-gray-300', 'font-bold');
			expect(button).toHaveAttribute('aria-current', 'page');
		});
	});

	it('should not apply active styles when isActive is false', async () => {
		const mockOnClick = vi.fn();
		render(<NavTab title='Chords' isActive={false} onFxn={mockOnClick} />);

		await waitFor(() => {
			const button = screen.getByTitle('Chords');
			expect(button).not.toHaveClass('bg-gray-300', 'font-bold');
			expect(button).not.toHaveAttribute('aria-current');
		});
	});

	it('should render different tabs correctly', async () => {
		const mockOnClick1 = vi.fn();
		const mockOnClick2 = vi.fn();
		const mockOnClick3 = vi.fn();

		render(
			<>
				<NavTab title='Chords' isActive={false} onFxn={mockOnClick1} />
				<NavTab title='Scales' isActive={false} onFxn={mockOnClick2} />
				<NavTab title='Play' isActive={false} onFxn={mockOnClick3} />
			</>
		);

		await waitFor(() => {
			expect(screen.getByText('Chords')).toBeInTheDocument();
			expect(screen.getByText('Scales')).toBeInTheDocument();
			expect(screen.getByText('Play')).toBeInTheDocument();
		});
	});
});
