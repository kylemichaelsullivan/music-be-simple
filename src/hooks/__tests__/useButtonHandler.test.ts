import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useButtonHandler } from '../useButtonHandler';

describe('useButtonHandler', () => {
	it('should return handleClick, handleKeyDown, and handleKeyUp', () => {
		const mockOnFxn = vi.fn();
		const { result } = renderHook(() => useButtonHandler(mockOnFxn));

		expect(result.current).toHaveProperty('handleClick');
		expect(result.current).toHaveProperty('handleKeyDown');
		expect(result.current).toHaveProperty('handleKeyUp');
		expect(typeof result.current.handleClick).toBe('function');
		expect(typeof result.current.handleKeyDown).toBe('function');
		expect(typeof result.current.handleKeyUp).toBe('function');
	});

	it('should call onFxn when handleClick is called', () => {
		const mockOnFxn = vi.fn();
		const { result } = renderHook(() => useButtonHandler(mockOnFxn));

		result.current.handleClick();

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
	});

	it('should call onFxn when Enter key is pressed', () => {
		const mockOnFxn = vi.fn();
		const { result } = renderHook(() => useButtonHandler(mockOnFxn));

		const mockEvent = {
			key: 'Enter',
			preventDefault: vi.fn(),
		} as unknown as React.KeyboardEvent<HTMLButtonElement>;

		result.current.handleKeyDown(mockEvent);

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
		expect(mockEvent.preventDefault).toHaveBeenCalled();
	});

	it('should call onFxn when Space key is pressed', () => {
		const mockOnFxn = vi.fn();
		const { result } = renderHook(() => useButtonHandler(mockOnFxn));

		const mockEvent = {
			key: ' ',
			preventDefault: vi.fn(),
		} as unknown as React.KeyboardEvent<HTMLButtonElement>;

		result.current.handleKeyDown(mockEvent);

		expect(mockOnFxn).toHaveBeenCalledTimes(1);
		expect(mockEvent.preventDefault).toHaveBeenCalled();
	});

	it('should not call onFxn for other keys', () => {
		const mockOnFxn = vi.fn();
		const { result } = renderHook(() => useButtonHandler(mockOnFxn));

		const mockEvent = {
			key: 'Escape',
			preventDefault: vi.fn(),
		} as unknown as React.KeyboardEvent<HTMLButtonElement>;

		result.current.handleKeyDown(mockEvent);

		expect(mockOnFxn).not.toHaveBeenCalled();
	});

	it('should update when onFxn changes', () => {
		const mockOnFxn1 = vi.fn();
		const { result, rerender } = renderHook(({ onFxn }) => useButtonHandler(onFxn), {
			initialProps: { onFxn: mockOnFxn1 },
		});

		result.current.handleClick();
		expect(mockOnFxn1).toHaveBeenCalledTimes(1);

		const mockOnFxn2 = vi.fn();
		rerender({ onFxn: mockOnFxn2 });

		result.current.handleClick();
		expect(mockOnFxn1).toHaveBeenCalledTimes(1);
		expect(mockOnFxn2).toHaveBeenCalledTimes(1);
	});
});
