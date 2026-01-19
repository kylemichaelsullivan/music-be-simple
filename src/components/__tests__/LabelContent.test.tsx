import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { LabelContent } from '../displays/instruments/LabelContent';

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
