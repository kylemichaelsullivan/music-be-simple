import { LabelContent } from '@/components/displays/instruments';
import { render, screen } from '@/test';
import { describe, expect, it } from 'vitest';

describe('LabelContent', () => {
	it('should render title in a span with sm:block', () => {
		render(<LabelContent icon='Guitar' title='Guitar' />);
		const span = screen.getByText('Guitar');
		expect(span).toHaveClass('hidden');
		expect(span).toHaveClass('sm:block');
	});

	it('should render instrument icon', () => {
		render(<LabelContent icon='Guitar' title='Guitar' />);
		// InstrumentIcon renders an img with alt="Guitar"
		expect(screen.getByRole('img', { name: 'Guitar' })).toBeInTheDocument();
	});

	it('should render different titles', () => {
		render(<LabelContent icon='Ukulele' title='Ukulele' />);
		expect(screen.getByText('Ukulele')).toBeInTheDocument();
	});
});
