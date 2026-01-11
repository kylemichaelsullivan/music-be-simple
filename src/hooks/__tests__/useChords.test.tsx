import { ChordsContextProvider } from '@/context/Chords';
import { GlobalsContextProvider } from '@/context/Globals';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useChords } from '../useChords';

describe('useChords', () => {
	it('should throw error when used outside provider', () => {
		// Suppress console.error for this test
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => {
			renderHook(() => useChords());
		}).toThrow('useChords must be used within a ChordsContextProvider');

		consoleSpy.mockRestore();
	});

	it('should return context value when used within provider', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ChordsContextProvider>{children}</ChordsContextProvider>
			</GlobalsContextProvider>
		);

		const { result } = renderHook(() => useChords(), { wrapper });

		expect(result.current).toHaveProperty('tonic');
		expect(result.current).toHaveProperty('variant');
		expect(result.current).toHaveProperty('notes');
		expect(result.current).toHaveProperty('chordName');
		expect(result.current).toHaveProperty('noteCount');
		expect(result.current).toHaveProperty('showNerdMode');
		expect(result.current).toHaveProperty('handleTonicChange');
		expect(result.current).toHaveProperty('handleVariantChange');
		expect(result.current).toHaveProperty('getBorderStyle');
		expect(result.current).toHaveProperty('toggleNerdMode');
		expect(typeof result.current.handleTonicChange).toBe('function');
		expect(typeof result.current.handleVariantChange).toBe('function');
		expect(typeof result.current.getBorderStyle).toBe('function');
		expect(typeof result.current.toggleNerdMode).toBe('function');
	});
});
