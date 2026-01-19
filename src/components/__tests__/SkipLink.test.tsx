import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SkipLink } from '../SkipLink';

describe('SkipLink', () => {
	it('should render with text and aria-label', () => {
		render(<SkipLink targetSelector='.target' text='Skip to section' />);
		const btn = screen.getByRole('button', { name: 'Skip to section' });
		expect(btn).toHaveAttribute('aria-label', 'Skip to section');
		expect(btn).toHaveTextContent('Skip to section');
	});

	it('should have sr-only class for screen-reader-only until focus', () => {
		render(<SkipLink targetSelector='.target' text='Skip' />);
		expect(screen.getByRole('button', { name: 'Skip' })).toHaveClass('sr-only');
	});

	it('should not throw when clicked and target does not exist', async () => {
		const user = userEvent.setup();
		render(<SkipLink targetSelector='.nonexistent' text='Skip' />);
		await user.click(screen.getByRole('button', { name: 'Skip' }));
		// scrollToTarget does nothing when querySelector returns null
	});
});
