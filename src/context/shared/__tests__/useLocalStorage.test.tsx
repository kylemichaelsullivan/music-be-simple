import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
	afterEach(() => {
		window.localStorage.clear();
	});

	it('should return initialValue when key is empty', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', z.boolean(), true));
		expect(result.current[0]).toBe(true);
	});

	it('should return stored value when key has valid data', () => {
		window.localStorage.setItem('test-key', JSON.stringify(false));
		const { result } = renderHook(() => useLocalStorage('test-key', z.boolean(), true));
		expect(result.current[0]).toBe(false);
	});

	it('should update value and persist when setValue is called with raw value', async () => {
		const { result } = renderHook(() => useLocalStorage('test-key', z.number(), 0));
		expect(result.current[0]).toBe(0);
		result.current[1](42);
		await waitFor(() => {
			expect(result.current[0]).toBe(42);
		});
		expect(JSON.parse(window.localStorage.getItem('test-key') as string)).toBe(42);
	});

	it('should update value when setValue is called with updater function', async () => {
		window.localStorage.setItem('test-key', JSON.stringify(10));
		const { result } = renderHook(() => useLocalStorage('test-key', z.number(), 0));
		expect(result.current[0]).toBe(10);
		result.current[1]((prev) => prev + 5);
		await waitFor(() => {
			expect(result.current[0]).toBe(15);
		});
	});

	it('should fall back to initialValue when stored data is invalid', () => {
		window.localStorage.setItem('test-key', 'not-valid-json');
		const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { result } = renderHook(() => useLocalStorage('test-key', z.boolean(), true));
		expect(result.current[0]).toBe(true);
		errSpy.mockRestore();
	});

	it('should fall back to initialValue when stored data fails schema validation', () => {
		window.localStorage.setItem('test-key', JSON.stringify('not-a-number'));
		const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { result } = renderHook(() => useLocalStorage('test-key', z.number(), 99));
		expect(result.current[0]).toBe(99);
		errSpy.mockRestore();
	});

	it('should not update state or localStorage when setValue receives value that fails schema', async () => {
		const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { result } = renderHook(() => useLocalStorage('test-key', z.number(), 10));
		expect(result.current[0]).toBe(10);
		(result.current[1] as (v: unknown) => void)('not-a-number');
		await waitFor(() => {});
		expect(result.current[0]).toBe(10);
		expect(window.localStorage.getItem('test-key')).toBeNull();
		errSpy.mockRestore();
	});
});
