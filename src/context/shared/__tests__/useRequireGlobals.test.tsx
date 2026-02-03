import { GlobalsContextProvider, useRequireGlobals } from '@/context';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useRequireGlobals', () => {
	it('should throw when used outside GlobalsContextProvider', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => {
			renderHook(() => useRequireGlobals());
		}).toThrow('This hook must be used within GlobalsContextProvider');

		consoleSpy.mockRestore();
	});

	it('should return globals when used within GlobalsContextProvider', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>{children}</GlobalsContextProvider>
		);

		const { result } = renderHook(() => useRequireGlobals(), { wrapper });

		expect(result.current).toHaveProperty('usingFlats');
		expect(result.current).toHaveProperty('displays');
		expect(result.current).toHaveProperty('toggleUsingFlats');
		expect(result.current).toHaveProperty('handleDisplaysClick');
	});
});
