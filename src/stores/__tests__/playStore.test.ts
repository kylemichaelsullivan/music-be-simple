import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePlayStore } from '../playStore';

describe('playStore', () => {
	it('should have reset and it should not throw when called', () => {
		const { result } = renderHook(() => usePlayStore());
		expect(typeof result.current.reset).toBe('function');
		expect(() => result.current.reset()).not.toThrow();
	});
});
