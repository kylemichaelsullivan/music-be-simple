import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useEscapeReset } from '../useEscapeReset';

function TestComponent({ onReset }: { onReset: () => void }) {
	useEscapeReset(onReset);
	return <div>Test</div>;
}

describe('useEscapeReset', () => {
	it('should call reset when Escape is pressed', async () => {
		const reset = vi.fn();
		render(<TestComponent onReset={reset} />);
		expect(reset).not.toHaveBeenCalled();
		await userEvent.keyboard('{Escape}');
		expect(reset).toHaveBeenCalledTimes(1);
	});

	it('should not call reset when another key is pressed', async () => {
		const reset = vi.fn();
		render(<TestComponent onReset={reset} />);
		await userEvent.keyboard('a');
		await userEvent.keyboard('{Enter}');
		expect(reset).not.toHaveBeenCalled();
	});
});
