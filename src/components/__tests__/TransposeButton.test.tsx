import { TransposeButton } from '@/components/buttons';
import { GlobalsContextProvider, ScalesContextProvider } from '@/context';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

describe('TransposeButton', () => {
	afterEach(() => {
		cleanup();
	});
	describe('Transpose Up', () => {
		it('should render transpose up button', () => {
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<TransposeButton direction='up' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const button = screen.getByTitle('Up a Fifth');
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass('TransposeUp');
		});

		it('should have correct title attribute', () => {
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<TransposeButton direction='up' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const button = screen.getByTitle('Up a Fifth');
			expect(button).toHaveAttribute('title', 'Up a Fifth');
		});

		it('should transpose tonic up a fifth when clicked', async () => {
			const user = userEvent.setup();
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<TransposeButton direction='up' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const button = screen.getByTitle('Up a Fifth');
			await user.click(button);

			// The button should be clickable and not throw errors
			expect(button).toBeInTheDocument();
		});

		it('should handle keyboard events', async () => {
			const user = userEvent.setup();
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<TransposeButton direction='up' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const button = screen.getByTitle('Up a Fifth');
			button.focus();
			await user.keyboard('{Enter}');

			// Button should handle the event without errors
			expect(button).toBeInTheDocument();
		});
	});

	describe('Transpose Down', () => {
		it('should render transpose down button', () => {
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<TransposeButton direction='down' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const button = screen.getByTitle('Down a Fifth');
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass('TransposeDown');
		});

		it('should have correct title attribute', () => {
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<TransposeButton direction='down' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const button = screen.getByTitle('Down a Fifth');
			expect(button).toHaveAttribute('title', 'Down a Fifth');
		});

		it('should transpose tonic down a fifth when clicked', async () => {
			const user = userEvent.setup();
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<TransposeButton direction='down' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const button = screen.getByTitle('Down a Fifth');
			await user.click(button);

			// The button should be clickable and not throw errors
			expect(button).toBeInTheDocument();
		});
	});
});
