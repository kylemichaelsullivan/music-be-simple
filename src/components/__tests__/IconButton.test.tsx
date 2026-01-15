import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from '../buttons/IconButton';

describe('IconButton', () => {
	const mockOnFxn = vi.fn();

	it('should render icon button', () => {
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn}>
				<span>Icon</span>
			</IconButton>
		);

		const button = screen.getByTitle('Test Button');
		expect(button).toBeInTheDocument();
	});

	it('should display children', () => {
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn}>
				<span>Icon Content</span>
			</IconButton>
		);

		expect(screen.getByText('Icon Content')).toBeInTheDocument();
	});

	it('should have correct title and aria-label', () => {
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn}>
				<span>Icon</span>
			</IconButton>
		);

		const button = screen.getByTitle('Test Button');
		expect(button).toHaveAttribute('title', 'Test Button');
		expect(button).toHaveAttribute('aria-label', 'Test Button');
	});

	it('should apply custom className', () => {
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn} className='custom-class'>
				<span>Icon</span>
			</IconButton>
		);

		const button = screen.getByTitle('Test Button');
		expect(button).toHaveClass('custom-class');
	});

	it('should apply default grayscale and opacity classes', () => {
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn}>
				<span>Icon</span>
			</IconButton>
		);

		const button = screen.getByTitle('Test Button');
		expect(button).toHaveClass('grayscale');
		expect(button).toHaveClass('opacity-65');
		expect(button).toHaveClass('hover:opacity-100');
	});

	it('should call onFxn when clicked', async () => {
		const user = userEvent.setup();
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn}>
				<span>Icon</span>
			</IconButton>
		);

		const button = screen.getByTitle('Test Button');
		await user.click(button);

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
	});

	it('should handle Enter key', async () => {
		const user = userEvent.setup();
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn}>
				<span>Icon</span>
			</IconButton>
		);

		const button = screen.getByTitle('Test Button');
		button.focus();
		await user.keyboard('{Enter}');

		expect(mockOnFxn).toHaveBeenCalled();
	});

	it('should handle Space key', async () => {
		const user = userEvent.setup();
		render(
			<IconButton title='Test Button' onFxn={mockOnFxn}>
				<span>Icon</span>
			</IconButton>
		);

		const button = screen.getByTitle('Test Button');
		button.focus();
		await user.keyboard(' ');

		expect(mockOnFxn).toHaveBeenCalled();
	});
});
