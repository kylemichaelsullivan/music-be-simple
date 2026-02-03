import { AllowedNote } from '@/components';
import { InstrumentNotesProvider } from '@/context';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

describe('AllowedNote', () => {
	afterEach(() => {
		cleanup();
	});

	const defaultProps = {
		note: 'C',
		isTonic: false,
		borderStyle: 'none' as const,
	};

	it('should render allowed note', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toBeInTheDocument();
		expect(note).toHaveClass('AllowedNote');
	});

	it('should display note text when showNoteLabels is true', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0} showNoteLabels={true}>
				<AllowedNote {...defaultProps} />
			</InstrumentNotesProvider>
		);

		expect(screen.getByText('C')).toBeInTheDocument();
	});

	it('should not display note text when showNoteLabels is false', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0} showNoteLabels={false}>
				<AllowedNote {...defaultProps} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toBeInTheDocument();
		expect(note).toHaveTextContent('');
	});

	it('should apply tonic background color when isTonic is true', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} isTonic={true} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toHaveClass('bg-green-800');
		expect(note).not.toHaveClass('bg-green-600');
	});

	it('should apply non-tonic background color when isTonic is false', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} isTonic={false} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toHaveClass('bg-green-600');
		expect(note).not.toHaveClass('bg-green-800');
	});

	it('should apply larger font size for tonic', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} isTonic={true} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toHaveClass('text-xxs');
	});

	it('should apply smaller font size for non-tonic', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} isTonic={false} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toHaveClass('text-xxxs');
	});

	it('should apply hasFlat class when note contains flat symbol', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} note='B♭' />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('B♭');
		expect(note).toHaveClass('hasFlat');
	});

	it('should apply hasSharp class when note contains sharp symbol', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} note='C♯' />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C♯');
		expect(note).toHaveClass('hasSharp');
	});

	it('should apply piano positioning when isPiano is true', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} isPiano={true} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toHaveClass('bottom-1');
		expect(note).not.toHaveClass('bottom-1/2');
	});

	it('should apply default positioning when isPiano is false', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} isPiano={false} />
			</InstrumentNotesProvider>
		);

		const note = screen.getByTitle('C');
		expect(note).toHaveClass('bottom-1/2');
		expect(note).toHaveClass('translate-y-1/2');
	});

	it('should use default showNoteLabels when not provided', () => {
		render(
			<InstrumentNotesProvider notes={[]} tonic={0}>
				<AllowedNote {...defaultProps} />
			</InstrumentNotesProvider>
		);

		// Default should be true
		expect(screen.getByText('C')).toBeInTheDocument();
	});
});
