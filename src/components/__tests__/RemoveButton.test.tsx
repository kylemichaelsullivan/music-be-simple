import { RemoveButton } from '@/components/buttons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('RemoveButton', () => {
	const mockOnFxn = vi.fn();

	it('should render remove button', () => {
		render(<RemoveButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Remove');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('RemoveButton');
	});

	it('should use default title when not provided', () => {
		render(<RemoveButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Remove');
		expect(button).toBeInTheDocument();
	});

	it('should use custom title when provided', () => {
		render(<RemoveButton title='Delete Item' onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Delete Item');
		expect(button).toBeInTheDocument();
	});

	it('should call onFxn when clicked', async () => {
		const user = userEvent.setup();
		render(<RemoveButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Remove');
		await user.click(button);

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
	});

	it('should have absolute positioning classes', () => {
		render(<RemoveButton onFxn={mockOnFxn} />);

		const button = screen.getByTitle('Remove');
		expect(button).toHaveClass('absolute');
		expect(button).toHaveClass('top-1');
		expect(button).toHaveClass('right-1');
	});
});
