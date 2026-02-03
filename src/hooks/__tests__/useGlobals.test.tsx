import { GlobalsContextProvider } from '@/context';
import { useGlobals } from '@/hooks';
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useGlobals', () => {
	it('should throw error when used outside provider', () => {
		// Suppress console.error for this test
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => {
			renderHook(() => useGlobals());
		}).toThrow('useGlobals must be used within a GlobalsContextProvider');

		consoleSpy.mockRestore();
	});

	it('should return context value when used within provider', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>{children}</GlobalsContextProvider>
		);

		const { result } = renderHook(() => useGlobals(), { wrapper });

		await waitFor(() => {
			expect(result.current).toHaveProperty('usingFlats');
			expect(result.current).toHaveProperty('displays');
			expect(result.current).toHaveProperty('toggleUsingFlats');
			expect(result.current).toHaveProperty('handleDisplaysClick');
			expect(result.current).toHaveProperty('playNote');
			expect(typeof result.current.toggleUsingFlats).toBe('function');
			expect(typeof result.current.handleDisplaysClick).toBe('function');
			expect(typeof result.current.playNote).toBe('function');
		});
	});

	it('should not throw when playNote is called', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>{children}</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useGlobals(), { wrapper });
		await waitFor(() => {
			expect(result.current).toHaveProperty('playNote');
		});
		act(() => {
			expect(() => result.current.playNote(0)).not.toThrow();
		});
	});
});
