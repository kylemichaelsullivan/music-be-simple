import { GlobalsContextProvider, ScalesContextProvider } from '@/context';
import { useScales } from '@/hooks';
import { useScalesStore } from '@/stores';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('useScales', () => {
	afterEach(() => {
		useScalesStore.getState().reset();
	});

	it('should throw error when used outside provider', () => {
		// Suppress console.error for this test
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => {
			renderHook(() => useScales());
		}).toThrow('useScales must be used within a ScalesContextProvider');

		consoleSpy.mockRestore();
	});

	it('should return context value when used within provider', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ScalesContextProvider>{children}</ScalesContextProvider>
			</GlobalsContextProvider>
		);

		const { result } = renderHook(() => useScales(), { wrapper });

		await waitFor(() => {
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

	it('should return getRelativeMajor for ionian as tonic note', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ScalesContextProvider>{children}</ScalesContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useScales(), { wrapper });
		await waitFor(() => {
			expect(result.current.getRelativeMajor('ionian')).toBe('C');
		});
	});

	it('should return getRelativeMinor for aeolian as tonic note', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ScalesContextProvider>{children}</ScalesContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useScales(), { wrapper });
		await waitFor(() => {
			expect(result.current.getRelativeMinor('aeolian')).toBe('C');
		});
	});

	it('should update notes when makeScale is called', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ScalesContextProvider>{children}</ScalesContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useScales(), { wrapper });
		await waitFor(() => {
			expect(result.current.tonic).toBe(0);
			expect(result.current.variant).toBe('major');
		});
		act(() => {
			result.current.makeScale(7, 'dorian');
		});
		await waitFor(() => {
			expect(result.current.tonic).toBe(7);
			expect(result.current.variant).toBe('dorian');
		});
		// G dorian: G A Bb C D E F
		expect(result.current.notes).toContain(7);
		expect(result.current.notes).toHaveLength(7);
	});

	it('should toggle showNoteLabels via toggleNoteLabels', async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<GlobalsContextProvider>
				<ScalesContextProvider>{children}</ScalesContextProvider>
			</GlobalsContextProvider>
		);
		const { result } = renderHook(() => useScales(), { wrapper });
		await waitFor(() => {
			expect(result.current).toHaveProperty('showNoteLabels');
		});
		const initial = result.current.showNoteLabels;
		act(() => {
			result.current.toggleNoteLabels();
		});
		await waitFor(() => {
			expect(result.current.showNoteLabels).toBe(!initial);
		});
	});
});
