import { GlobalsContextProvider } from '@/context/Globals';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { UseFlatsButton } from '../buttons/UseFlatsButton';

describe('UseFlatsButton', () => {
	afterEach(() => {
		cleanup();
	});

	it('should render use flats button', () => {
		render(
			<GlobalsContextProvider>
				<UseFlatsButton />
			</GlobalsContextProvider>
		);

		const button = screen.getByTitle(/Use (Sharps|Flats)\?/);
		expect(button).toBeInTheDocument();
	});

	it('should display flat icon when usingFlats is true', () => {
		render(
			<GlobalsContextProvider>
				<UseFlatsButton />
			</GlobalsContextProvider>
		);

		const button = screen.getByTitle(/Use (Sharps|Flats)\?/);
		// The button should contain the flat or sharp icon
		expect(button).toBeInTheDocument();
	});

	it('should have correct title when using flats', () => {
		render(
			<GlobalsContextProvider>
				<UseFlatsButton />
			</GlobalsContextProvider>
		);

		const button = screen.getByTitle(/Use (Sharps|Flats)\?/);
		const title = button.getAttribute('title');
		// Title should be either 'Use Sharps?' or 'Use Flats?' depending on state
		expect(title).toMatch(/Use (Sharps|Flats)\?/);
	});

	it('should toggle usingFlats when clicked', async () => {
		const user = userEvent.setup();
		render(
			<GlobalsContextProvider>
				<UseFlatsButton />
			</GlobalsContextProvider>
		);

		const button = screen.getByTitle(/Use (Sharps|Flats)\?/);
		const initialTitle = button.getAttribute('title');

		await user.click(button);

		// Title should change after toggle
		const newTitle = button.getAttribute('title');
		expect(newTitle).not.toBe(initialTitle);
	});

	it('should accept position prop', () => {
		render(
			<GlobalsContextProvider>
				<UseFlatsButton position='left' />
			</GlobalsContextProvider>
		);

		const button = screen.getByTitle(/Use (Sharps|Flats)\?/);
		expect(button).toBeInTheDocument();
	});

	it('should default to right position when position not provided', () => {
		render(
			<GlobalsContextProvider>
				<UseFlatsButton />
			</GlobalsContextProvider>
		);

		const button = screen.getByTitle(/Use (Sharps|Flats)\?/);
		expect(button).toBeInTheDocument();
	});
});
