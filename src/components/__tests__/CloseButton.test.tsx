import { CloseButton } from '@/components/buttons';
import { render, screen } from '@/test';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('CloseButton', () => {
	it('should render with Close title and aria-label', () => {
		render(<CloseButton onFxn={() => {}} />);
		const btn = screen.getByTitle('Close');
		expect(btn).toHaveAttribute('aria-label', 'Close');
	});

	it('should call onFxn when clicked', async () => {
		const onFxn = vi.fn();
		const user = userEvent.setup();
		render(<CloseButton onFxn={onFxn} />);
		await user.click(screen.getByTitle('Close'));
		expect(onFxn).toHaveBeenCalledTimes(1);
	});

	it('should call onFxn when Escape is pressed', async () => {
		const onFxn = vi.fn();
		const user = userEvent.setup();
		render(<CloseButton onFxn={onFxn} />);
		await user.keyboard('{Escape}');
		expect(onFxn).toHaveBeenCalledTimes(1);
	});

	it('should call onFxn when clicking outside container (with containerRef)', async () => {
		const onFxn = vi.fn();
		const user = userEvent.setup();
		const containerRef: { current: HTMLDivElement | null } = { current: null };
		render(
			<div>
				<div
					ref={(el) => {
						containerRef.current = el;
					}}
				>
					<CloseButton onFxn={onFxn} containerRef={containerRef} />
				</div>
				<button type='button'>Outside</button>
			</div>
		);
		await user.click(screen.getByRole('button', { name: 'Outside' }));
		expect(onFxn).toHaveBeenCalledTimes(1);
	});
});
