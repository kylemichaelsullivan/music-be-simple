import { InstrumentNotesProvider } from '@/context';
import { useInstrumentNotes } from '@/hooks';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useInstrumentNotes', () => {
	it('should throw error when used outside provider', () => {
		// Suppress console.error for this test
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => {
			renderHook(() => useInstrumentNotes());
		}).toThrow('useInstrumentNotes must be used within an InstrumentNotesProvider');

		consoleSpy.mockRestore();
	});

	it('should return context value when used within provider', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<InstrumentNotesProvider notes={[0, 2, 4]} tonic={0}>
				{children}
			</InstrumentNotesProvider>
		);

		const { result } = renderHook(() => useInstrumentNotes(), { wrapper });

		expect(result.current).toHaveProperty('notes');
		expect(result.current).toHaveProperty('tonic');
		expect(result.current).toHaveProperty('showNoteLabels');
		expect(result.current.notes).toEqual([0, 2, 4]);
		expect(result.current.tonic).toBe(0);
		expect(result.current.showNoteLabels).toBe(true);
	});

	it('should return showNoteLabels as false when provided', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<InstrumentNotesProvider notes={[0, 2, 4]} tonic={0} showNoteLabels={false}>
				{children}
			</InstrumentNotesProvider>
		);

		const { result } = renderHook(() => useInstrumentNotes(), { wrapper });

		expect(result.current.showNoteLabels).toBe(false);
	});

	it('should return getBorderStyle when provided', () => {
		const mockGetBorderStyle = vi.fn();
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<InstrumentNotesProvider notes={[0, 2, 4]} tonic={0} getBorderStyle={mockGetBorderStyle}>
				{children}
			</InstrumentNotesProvider>
		);

		const { result } = renderHook(() => useInstrumentNotes(), { wrapper });

		expect(result.current.getBorderStyle).toBe(mockGetBorderStyle);
	});

	it('should return showNerdMode when provided', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<InstrumentNotesProvider notes={[0, 2, 4]} tonic={0} showNerdMode={true}>
				{children}
			</InstrumentNotesProvider>
		);

		const { result } = renderHook(() => useInstrumentNotes(), { wrapper });

		expect(result.current.showNerdMode).toBe(true);
	});

	it('should return showNerdMode as undefined when not provided', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<InstrumentNotesProvider notes={[0, 2, 4]} tonic={0}>
				{children}
			</InstrumentNotesProvider>
		);

		const { result } = renderHook(() => useInstrumentNotes(), { wrapper });

		expect(result.current.showNerdMode).toBeUndefined();
	});
});
