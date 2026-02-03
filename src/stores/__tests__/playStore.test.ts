import { usePlayStore } from '@/stores';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('playStore', () => {
	it('should have reset and it should not throw when called', () => {
		const { result } = renderHook(() => usePlayStore());
		expect(typeof result.current.reset).toBe('function');
		act(() => {
			expect(() => result.current.reset()).not.toThrow();
		});
	});
});
