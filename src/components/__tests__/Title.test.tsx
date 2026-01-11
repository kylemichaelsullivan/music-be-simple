import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Title } from '../Title';

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
});
