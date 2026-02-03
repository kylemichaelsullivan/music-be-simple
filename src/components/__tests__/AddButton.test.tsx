import { AddButton } from '@/components/buttons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('AddButton', () => {
	const mockOnFxn = vi.fn();

	it('should render add button', () => {
		render(<AddButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Add');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('AddButton');
	});

	it('should use default title when not provided', () => {
		render(<AddButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Add');
		expect(button).toBeInTheDocument();
	});

	it('should use custom title when provided', () => {
		render(<AddButton title='Add Item' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Add Item');
		expect(button).toBeInTheDocument();
	});

	it('should call onFxn when clicked', async () => {
		const user = userEvent.setup();
		render(<AddButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Add');
		await user.click(button);

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
	});

	it('should have rounded-full class', () => {
		render(<AddButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Add');
		expect(button).toHaveClass('rounded-full');
	});
});
