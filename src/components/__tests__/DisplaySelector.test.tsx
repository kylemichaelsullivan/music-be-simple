import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DisplaySelector } from '../displays/DisplaySelector';

describe('DisplaySelector', () => {
	afterEach(() => {
		cleanup();
	});

	const mockOnFxn = vi.fn();

	it('should render display selector button', () => {
		render(<DisplaySelector icon='Guitar' text='Guitar' isActive={true} onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Guitar');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('DisplaySelector');
	});

	it('should display correct text', () => {
		render(<DisplaySelector icon='Guitar' text='Guitar' isActive={true} onFxn={mockOnFxn} />);

		expect(screen.getByText('Guitar')).toBeInTheDocument();
	});

	it('should have correct title attribute', () => {
		render(<DisplaySelector icon='Guitar' text='Guitar' isActive={true} onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Guitar');
		expect(button).toHaveAttribute('title', 'Guitar');
	});

	it('should apply active styles when isActive is true', () => {
		render(<DisplaySelector icon='Guitar' text='Guitar' isActive={true} onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Guitar');
		expect(button).toHaveClass('opacity-65');
		expect(button).toHaveClass('hover:opacity-100');
		expect(button).not.toHaveClass('opacity-30');
	});

	it('should apply inactive styles when isActive is false', () => {
		render(<DisplaySelector icon='Guitar' text='Guitar' isActive={false} onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Guitar');
		expect(button).toHaveClass('opacity-30');
		expect(button).not.toHaveClass('opacity-100');
	});

	it('should call onFxn with icon when clicked', async () => {
		const user = userEvent.setup();
		render(<DisplaySelector icon='Guitar' text='Guitar' isActive={true} onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Guitar');
		await user.click(button);

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
		expect(mockOnFxn).toHaveBeenCalledWith('Guitar');
	});

	it('should call onFxn with correct icon for different icons', async () => {
		const user = userEvent.setup();
		const mockOnFxnPiano = vi.fn();

		render(<DisplaySelector icon='Piano' text='Piano' isActive={true} onFxn={mockOnFxnPiano} />);

		const button = screen.getByTitle('Piano');
		await user.click(button);

		expect(mockOnFxnPiano).toHaveBeenCalledWith('Piano');
	});

	it('should handle keyboard events', async () => {
		const user = userEvent.setup();
		render(<DisplaySelector icon='Guitar' text='Guitar' isActive={true} onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Guitar');
		button.focus();
		await user.keyboard('{Enter}');

		expect(mockOnFxn).toHaveBeenCalled();
	});
});
