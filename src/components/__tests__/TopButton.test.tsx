import { TopButton } from '@/components/buttons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('TopButton', () => {
	const mockOnFxn = vi.fn();

	it('should render top button', () => {
		render(<TopButton title='Test Button' icon='♭' position='right' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Test Button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('TestButton');
	});

	it('should display icon', () => {
		render(<TopButton title='Test Button' icon='♭' position='right' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Test Button');
		expect(button).toHaveTextContent('♭');
	});

	it('should have correct title attribute', () => {
		render(<TopButton title='Test Button' icon='♯' position='right' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Test Button');
		expect(button).toHaveAttribute('title', 'Test Button');
	});

	it('should position on right when position is right', () => {
		render(<TopButton title='Test Button' icon='♭' position='right' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Test Button');
		expect(button).toHaveClass('right-0');
		expect(button).not.toHaveClass('left-0');
	});

	it('should position on left when position is left', () => {
		render(<TopButton title='Test Button' icon='♭' position='left' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Test Button');
		expect(button).toHaveClass('left-0');
		expect(button).not.toHaveClass('right-0');
	});

	it('should call onFxn when clicked', async () => {
		const user = userEvent.setup();
		render(<TopButton title='Test Button' icon='♭' position='right' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Test Button');
		await user.click(button);

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
	});

	it('should handle keyboard events', async () => {
		const user = userEvent.setup();
		render(<TopButton title='Test Button' icon='♭' position='right' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Test Button');
		button.focus();
		await user.keyboard('{Enter}');

		expect(mockOnFxn).toHaveBeenCalled();
	});

	it('should remove spaces and question marks from title for className', () => {
		render(<TopButton title='Use Sharps?' icon='♭' position='right' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Use Sharps?');
		expect(button).toHaveClass('UseSharps');
	});
});
