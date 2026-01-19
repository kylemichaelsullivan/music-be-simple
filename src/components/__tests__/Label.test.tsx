import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Label } from '../displays/instruments/Label';

describe('Label', () => {
	it('should render as div when onTuningClick is not provided', () => {
		render(<Label icon='Guitar' title='Guitar' />);
		const el = screen.getByTitle('Guitar');
		expect(el.tagName).toBe('DIV');
		expect(el).toHaveClass('Label');
	});

	it('should render as button when onTuningClick is provided', () => {
		render(<Label icon='Guitar' title='Guitar' onTuningClick={() => {}} />);
		const btn = screen.getByRole('button', { name: /Edit Tuning for Guitar/i });
		expect(btn).toHaveAttribute('title', 'Guitar');
		expect(btn).toHaveClass('Label');
	});

	it('should call onTuningClick when the button is clicked', async () => {
		const onTuningClick = vi.fn();
		const user = userEvent.setup();
		render(<Label icon='Guitar' title='Guitar' onTuningClick={onTuningClick} />);
		await user.click(screen.getByRole('button', { name: /Edit Tuning for Guitar/i }));
		expect(onTuningClick).toHaveBeenCalledTimes(1);
	});

	it('should include instrument title in Edit Tuning aria-label', () => {
		render(<Label icon='Ukulele' title='Ukulele' onTuningClick={() => {}} />);
		expect(screen.getByRole('button', { name: 'Edit Tuning for Ukulele' })).toBeInTheDocument();
	});
});
