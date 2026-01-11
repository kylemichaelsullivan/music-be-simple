import { GlobalsContextProvider } from '@/context/Globals';
import { ScalesContextProvider } from '@/context/Scales';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useScales } from '../useScales';

describe('useScales', () => {
	it('should throw error when used outside provider', () => {
		// Suppress console.error for this test
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => {
			renderHook(() => useScales());
		}).toThrow('useScales must be used within a ScalesContextProvider');

		consoleSpy.mockRestore();
	});

	it('should return context value when used within provider', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ScalesContextProvider>{children}</ScalesContextProvider>
			</GlobalsContextProvider>
		);

		const { result } = renderHook(() => useScales(), { wrapper });

		expect(result.current).toHaveProperty('tonic');
		expect(result.current).toHaveProperty('variant');
		expect(result.current).toHaveProperty('notes');
		expect(result.current).toHaveProperty('showNoteLabels');
		expect(result.current).toHaveProperty('handleTonicChange');
		expect(result.current).toHaveProperty('handleVariantChange');
		expect(result.current).toHaveProperty('makeScale');
		expect(result.current).toHaveProperty('getRelativeMajor');
		expect(result.current).toHaveProperty('getRelativeMinor');
		expect(result.current).toHaveProperty('toggleNoteLabels');
		expect(typeof result.current.handleTonicChange).toBe('function');
		expect(typeof result.current.handleVariantChange).toBe('function');
		expect(typeof result.current.makeScale).toBe('function');
		expect(typeof result.current.getRelativeMajor).toBe('function');
		expect(typeof result.current.getRelativeMinor).toBe('function');
		expect(typeof result.current.toggleNoteLabels).toBe('function');
	});
});
