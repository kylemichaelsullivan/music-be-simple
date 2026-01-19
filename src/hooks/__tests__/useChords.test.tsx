import { ChordsContextProvider } from '@/context/Chords';
import { GlobalsContextProvider } from '@/context/Globals';
import { useChordsStore } from '@/stores/chordsStore';
import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useChords } from '../useChords';

describe('useChords', () => {
	afterEach(() => {
		useChordsStore.getState().reset();
	});

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

	it('should return chordName as string', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ChordsContextProvider>{children}</ChordsContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useChords(), { wrapper });
		expect(typeof result.current.chordName).toBe('string');
		expect(result.current.chordName.length).toBeGreaterThan(0);
	});

	it('should return getBorderStyle none when showNerdMode is true', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ChordsContextProvider>{children}</ChordsContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useChords(), { wrapper });
		expect(result.current.getBorderStyle(0)).toBe('none');
		expect(result.current.getBorderStyle(4)).toBe('none');
	});

	it('should update notes when makeScale (makeChord) is called', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ChordsContextProvider>{children}</ChordsContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useChords(), { wrapper });
		result.current.makeScale(7, 'minor');
		await waitFor(() => {
			expect(result.current.tonic).toBe(7);
			expect(result.current.variant).toBe('minor');
		});
		// G minor: G, Bb, D
		expect(result.current.notes).toContain(7);
		expect(result.current.notes).toContain(10);
		expect(result.current.notes).toContain(2);
	});

	it('should toggle showNerdMode via toggleNerdMode', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ChordsContextProvider>{children}</ChordsContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useChords(), { wrapper });
		const initial = result.current.showNerdMode;
		result.current.toggleNerdMode();
		await waitFor(() => {
			expect(result.current.showNerdMode).toBe(!initial);
		});
	});
});
