import { GlobalsContextProvider } from '@/context/Globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Tonic from '../Tonic';

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

beforeEach(() => {
	localStorageMock.clear();
});

describe('Tonic', () => {
	const mockHandleTonicChange = vi.fn();

	it('should render with correct initial value', () => {
		render(
			<GlobalsContextProvider>
				<Tonic tonic={0} handleTonicChange={mockHandleTonicChange} />
			</GlobalsContextProvider>
		);

		const select = screen.getByRole('combobox');
		expect(select).toBeInTheDocument();
		expect(select).toHaveValue('0');
	});

	it('should display all 12 notes as options', () => {
		render(
			<GlobalsContextProvider>
				<Tonic tonic={0} handleTonicChange={mockHandleTonicChange} />
			</GlobalsContextProvider>
		);

		const select = screen.getByRole('combobox');
		const options = Array.from(select.querySelectorAll('option'));
		expect(options).toHaveLength(12);
	});

	it('should call handleTonicChange when value changes', async () => {
		const user = userEvent.setup();
		render(
			<GlobalsContextProvider>
				<Tonic tonic={0} handleTonicChange={mockHandleTonicChange} />
			</GlobalsContextProvider>
		);

		const select = screen.getByRole('combobox');
		await user.selectOptions(select, '5');

		expect(mockHandleTonicChange).toHaveBeenCalledWith(5);
	});

	it('should display flats when usingFlats is true', () => {
		render(
			<GlobalsContextProvider>
				<Tonic tonic={1} handleTonicChange={mockHandleTonicChange} />
			</GlobalsContextProvider>
		);

		const select = screen.getByRole('combobox');
		expect(select).toHaveClass('hasFlat');
	});

	it('should have correct classes based on note type', () => {
		const { rerender } = render(
			<GlobalsContextProvider>
				<Tonic tonic={1} handleTonicChange={mockHandleTonicChange} />
			</GlobalsContextProvider>
		);

		let select = screen.getByRole('combobox');
		expect(select).toHaveClass('hasFlat');

		rerender(
			<GlobalsContextProvider>
				<Tonic tonic={2} handleTonicChange={mockHandleTonicChange} />
			</GlobalsContextProvider>
		);

		select = screen.getByRole('combobox');
		expect(select).not.toHaveClass('hasFlat');
		expect(select).not.toHaveClass('hasSharp');
	});
});
