import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Title } from '@/components';

describe('Title', () => {
	it('should render title with text', () => {
		render(<Title title='Chords' />);

		expect(screen.getByText('Chords')).toBeInTheDocument();
	});

	it('should have Title class', () => {
		render(<Title title='Scales' />);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toHaveClass('Title');
	});

	it('should render different titles correctly', () => {
		render(<Title title='Play' />);

		expect(screen.getByText('Play')).toBeInTheDocument();
	});

	it('should render as h1 element', () => {
		render(<Title title='Chords' />);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading.tagName).toBe('H1');
	});

	it('should call onTitleClick when interactive heading is clicked', async () => {
		const user = userEvent.setup();
		const onTitleClick = vi.fn();
		render(<Title actionLabel='Pick a Random Chord' onTitleClick={onTitleClick} title='Chords' />);

		await user.click(screen.getByRole('button', { name: /Pick a random chord/i }));
		expect(onTitleClick).toHaveBeenCalledTimes(1);
	});
});
