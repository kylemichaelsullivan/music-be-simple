import { TuningModal } from '@/components';
import { render, screen } from '@/test';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('TuningModal', () => {
	it('should render Edit Tuning heading', () => {
		render(<TuningModal instrument='Guitar' />);
		expect(screen.getByRole('heading', { name: /Edit Tuning/i })).toBeInTheDocument();
	});

	it('should render string labels for Guitar', () => {
		render(<TuningModal instrument='Guitar' />);
		expect(screen.getByText('String 1')).toBeInTheDocument();
		expect(screen.getByText('String 6')).toBeInTheDocument();
	});

	it('should render string labels for Ukulele', () => {
		render(<TuningModal instrument='Ukulele' />);
		expect(screen.getByText('String 1')).toBeInTheDocument();
		expect(screen.getByText('String 4')).toBeInTheDocument();
	});

	it('should render Drone label for Banjo', () => {
		render(<TuningModal instrument='Banjo' />);
		expect(screen.getByText('Drone')).toBeInTheDocument();
	});

	it('should render Reset to Default button', () => {
		render(<TuningModal instrument='Guitar' />);
		expect(screen.getByRole('button', { name: /Reset to Default/i })).toBeInTheDocument();
	});

	it('should render Close button', () => {
		render(<TuningModal instrument='Guitar' />);
		expect(screen.getByTitle('Close')).toBeInTheDocument();
	});

	it('should have dialog with aria-modal and aria-labelledby', () => {
		render(<TuningModal instrument='Guitar' />);
		const dialog = document.querySelector('dialog.TuningModal');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
		expect(dialog).toHaveAttribute('aria-labelledby', 'tuning-modal-title');
	});

	it('should display default tuning for Guitar (E A D G B E)', () => {
		render(<TuningModal instrument='Guitar' />);
		const s1 = screen.getByLabelText('String 1');
		expect(s1).toHaveValue('4'); // E
	});

	it('should update tuning when a string select is changed', async () => {
		const user = userEvent.setup();
		render(<TuningModal instrument='Guitar' />);
		const s1 = screen.getByLabelText('String 1');
		await user.selectOptions(s1, '5'); // F
		expect(s1).toHaveValue('5');
	});

	it('should call window.confirm when Reset to Default is clicked', async () => {
		const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
		const user = userEvent.setup();
		render(<TuningModal instrument='Guitar' />);
		await user.click(screen.getByRole('button', { name: /Reset to Default/i }));
		expect(confirmSpy).toHaveBeenCalledWith('Reset this instrument’s tuning to default?');
		confirmSpy.mockRestore();
	});

	it('should not throw when Close button is clicked', async () => {
		const user = userEvent.setup();
		render(<TuningModal instrument='Guitar' />);
		await user.click(screen.getByTitle('Close'));
		expect(screen.getByRole('heading', { name: /Edit Tuning/i })).toBeInTheDocument();
	});
});
