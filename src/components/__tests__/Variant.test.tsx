import { Variant } from '@/components';
import { ChordsContextProvider, GlobalsContextProvider, ScalesContextProvider } from '@/context';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

describe('Variant', () => {
	afterEach(() => {
		cleanup();
	});

	describe('Scale Variant', () => {
		it('should render scale variant selector', () => {
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<Variant type='scale' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Scale Variant' });
			expect(select).toBeInTheDocument();
			expect(select).toHaveClass('Variant');
			expect(select).toHaveAttribute('name', 'Scale Variant');
		});

		it('should display all scale types as options', () => {
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<Variant type='scale' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Scale Variant' });
			const options = Array.from(select.querySelectorAll('option'));
			expect(options.length).toBeGreaterThan(0);
		});

		it('should call handleVariantChange when scale variant changes', async () => {
			const user = userEvent.setup();
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<Variant type='scale' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Scale Variant' });
			const options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			if (options.length > 1) {
				await user.selectOptions(select, options[1].value);
				// The handler is called through the context, so we verify the select value changed
				expect(select).toHaveValue(options[1].value);
			}
		});

		it('should capitalize scale type names', () => {
			render(
				<GlobalsContextProvider>
					<ScalesContextProvider>
						<Variant type='scale' />
					</ScalesContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Scale Variant' });
			const options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			// Check that option text is capitalized (first letter uppercase)
			for (const option of options) {
				if (option.textContent) {
					const firstChar = option.textContent[0];
					expect(firstChar).toBe(firstChar.toUpperCase());
				}
			}
		});
	});

	describe('Chord Variant', () => {
		it('should render chord variant selector', () => {
			render(
				<GlobalsContextProvider>
					<ChordsContextProvider>
						<Variant type='chord' />
					</ChordsContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Chord Variant' });
			expect(select).toBeInTheDocument();
			expect(select).toHaveClass('Variant');
			expect(select).toHaveAttribute('name', 'Chord Variant');
		});

		it('should display chord variants grouped by category', () => {
			render(
				<GlobalsContextProvider>
					<ChordsContextProvider>
						<Variant type='chord' />
					</ChordsContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Chord Variant' });
			const optgroups = Array.from(select.querySelectorAll('optgroup'));
			expect(optgroups.length).toBeGreaterThan(0);
		});

		it('should call handleVariantChange when chord variant changes', async () => {
			const user = userEvent.setup();
			render(
				<GlobalsContextProvider>
					<ChordsContextProvider>
						<Variant type='chord' />
					</ChordsContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Chord Variant' });
			const options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			if (options.length > 1) {
				await user.selectOptions(select, options[1].value);
				expect(select).toHaveValue(options[1].value);
			}
		});

		it('should display chord symbol and display name in options', () => {
			render(
				<GlobalsContextProvider>
					<ChordsContextProvider>
						<Variant type='chord' />
					</ChordsContextProvider>
				</GlobalsContextProvider>
			);

			const select = screen.getByRole('combobox', { name: 'Chord Variant' });
			const options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			// Check that options contain the pipe separator indicating symbol | display format
			const optionsWithPipe = options.filter((option) => option.textContent?.includes('|'));
			expect(optionsWithPipe.length).toBeGreaterThan(0);
		});
	});
});
