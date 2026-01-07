import { GlobalsContextProvider } from '@/context/Globals';
import { PlayContextProvider } from '@/context/Play';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePlay } from '../usePlay';

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

// Mock URL.createObjectURL and URL.revokeObjectURL
const createObjectURLMock = vi.fn(() => 'blob:mock-url');
const revokeObjectURLMock = vi.fn();
global.URL.createObjectURL = createObjectURLMock;
global.URL.revokeObjectURL = revokeObjectURLMock;

// Mock document.createElement and appendChild/removeChild
let mockAnchor: HTMLAnchorElement;
let anchorClickMock: ReturnType<typeof vi.fn>;
const createElementSpy = vi.spyOn(document, 'createElement');
const appendChildSpy = vi.spyOn(document.body, 'appendChild');
const removeChildSpy = vi.spyOn(document.body, 'removeChild');

beforeEach(() => {
	localStorageMock.clear();

	// Create a proper mock anchor element
	mockAnchor = document.createElement('a');
	anchorClickMock = vi.fn();
	// Ensure TS knows this is a mock (HTMLAnchorElement.click is typed as () => void)
	(mockAnchor as unknown as { click: typeof anchorClickMock }).click = anchorClickMock;
	createElementSpy.mockReturnValue(mockAnchor);
	appendChildSpy.mockClear();
	removeChildSpy.mockClear();
});

afterEach(() => {
	vi.clearAllMocks();
});

describe('usePlay', () => {
	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<GlobalsContextProvider>
			<PlayContextProvider>{children}</PlayContextProvider>
		</GlobalsContextProvider>
	);

	it('should throw error when used outside provider', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		try {
			renderHook(() => usePlay());
			expect.fail('Should have thrown an error');
		} catch (error) {
			expect((error as Error).message).toContain(
				'usePlay must be used within a PlayContextProvider'
			);
		}

		consoleSpy.mockRestore();
	});

	it('should return context value when used within provider', () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		expect(result.current).toHaveProperty('chordBinItems');
		expect(result.current).toHaveProperty('notepadLines');
		expect(result.current).toHaveProperty('addChordBinItem');
		expect(result.current).toHaveProperty('removeChordBinItem');
		expect(result.current).toHaveProperty('addNotepadLine');
		expect(result.current).toHaveProperty('removeNotepadLine');
		expect(result.current).toHaveProperty('importChordBin');
		expect(result.current).toHaveProperty('importNotepad');
		expect(result.current).toHaveProperty('importAll');
		expect(result.current).toHaveProperty('exportChordBin');
		expect(result.current).toHaveProperty('exportNotepad');
		expect(result.current).toHaveProperty('exportAll');
		expect(result.current).toHaveProperty('reset');

		expect(Array.isArray(result.current.chordBinItems)).toBe(true);
		expect(Array.isArray(result.current.notepadLines)).toBe(true);
		expect(typeof result.current.addChordBinItem).toBe('function');
		expect(typeof result.current.removeChordBinItem).toBe('function');
		expect(typeof result.current.addNotepadLine).toBe('function');
		expect(typeof result.current.removeNotepadLine).toBe('function');
	});

	it('should initialize with empty arrays', () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		expect(result.current.chordBinItems).toEqual([]);
		expect(result.current.notepadLines).toEqual([]);
	});

	it('should add chord bin items', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		expect(result.current.chordBinItems).toHaveLength(0);

		act(() => {
			result.current.addChordBinItem();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems.length).toBeGreaterThan(0);
		});

		const initialLength = result.current.chordBinItems.length;
		act(() => {
			result.current.addChordBinItem();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems.length).toBe(initialLength + 1);
		});
	});

	it('should remove chord bin items', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		// Add two items separately to ensure different timestamps
		act(() => {
			result.current.addChordBinItem();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems.length).toBe(1);
		});

		act(() => {
			result.current.addChordBinItem();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems.length).toBe(2);
		});

		const firstId = result.current.chordBinItems[0];
		act(() => {
			result.current.removeChordBinItem(firstId);
		});

		await waitFor(() => {
			expect(result.current.chordBinItems).not.toContain(firstId);
			expect(result.current.chordBinItems.length).toBe(1);
		});
	});

	it('should add notepad lines', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		expect(result.current.notepadLines).toHaveLength(0);

		act(() => {
			result.current.addNotepadLine();
		});

		await waitFor(() => {
			expect(result.current.notepadLines.length).toBeGreaterThan(0);
		});

		const initialLength = result.current.notepadLines.length;
		act(() => {
			result.current.addNotepadLine();
		});

		await waitFor(() => {
			expect(result.current.notepadLines.length).toBe(initialLength + 1);
		});
	});

	it('should remove notepad lines', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		// Add two lines separately to ensure different timestamps
		act(() => {
			result.current.addNotepadLine();
		});

		await waitFor(() => {
			expect(result.current.notepadLines.length).toBe(1);
		});

		act(() => {
			result.current.addNotepadLine();
		});

		await waitFor(() => {
			expect(result.current.notepadLines.length).toBe(2);
		});

		const firstId = result.current.notepadLines[0];
		act(() => {
			result.current.removeNotepadLine(firstId);
		});

		await waitFor(() => {
			expect(result.current.notepadLines).not.toContain(firstId);
			expect(result.current.notepadLines.length).toBe(1);
		});
	});

	it('should import chord bin', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		const items = [100, 200, 300];
		act(() => {
			result.current.importChordBin(items);
		});

		await waitFor(() => {
			expect(result.current.chordBinItems).toEqual(items);
		});
	});

	it('should import notepad', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		const lines = [400, 500, 600];
		act(() => {
			result.current.importNotepad(lines);
		});

		await waitFor(() => {
			expect(result.current.notepadLines).toEqual(lines);
		});
	});

	it('should import all', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		const data = {
			chordBin: [100, 200],
			notepad: [300, 400],
		};

		act(() => {
			result.current.importAll(data);
		});

		await waitFor(() => {
			expect(result.current.chordBinItems).toEqual(data.chordBin);
			expect(result.current.notepadLines).toEqual(data.notepad);
		});
	});

	it('should export chord bin', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		// Add some items
		act(() => {
			result.current.addChordBinItem();
			result.current.addChordBinItem();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems.length).toBeGreaterThan(0);
		});

		// Clear previous calls
		createElementSpy.mockClear();
		appendChildSpy.mockClear();
		removeChildSpy.mockClear();
		anchorClickMock.mockClear();
		revokeObjectURLMock.mockClear();

		act(() => {
			result.current.exportChordBin();
		});

		// Export is synchronous, so we can check immediately
		expect(createElementSpy).toHaveBeenCalledWith('a');
		expect(appendChildSpy).toHaveBeenCalledWith(mockAnchor);
		expect(anchorClickMock).toHaveBeenCalled();
		expect(removeChildSpy).toHaveBeenCalledWith(mockAnchor);
		expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url');
	});

	it('should export notepad', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		// Add some lines
		act(() => {
			result.current.addNotepadLine();
			result.current.addNotepadLine();
		});

		await waitFor(() => {
			expect(result.current.notepadLines.length).toBeGreaterThan(0);
		});

		// Clear previous calls
		createElementSpy.mockClear();
		appendChildSpy.mockClear();
		removeChildSpy.mockClear();
		anchorClickMock.mockClear();
		revokeObjectURLMock.mockClear();

		act(() => {
			result.current.exportNotepad();
		});

		// Export is synchronous, so we can check immediately
		expect(createElementSpy).toHaveBeenCalledWith('a');
		expect(appendChildSpy).toHaveBeenCalledWith(mockAnchor);
		expect(anchorClickMock).toHaveBeenCalled();
		expect(removeChildSpy).toHaveBeenCalledWith(mockAnchor);
		expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url');
	});

	it('should export all', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		// Add some items and lines
		act(() => {
			result.current.addChordBinItem();
			result.current.addNotepadLine();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems.length).toBeGreaterThan(0);
			expect(result.current.notepadLines.length).toBeGreaterThan(0);
		});

		// Clear previous calls
		createElementSpy.mockClear();
		appendChildSpy.mockClear();
		removeChildSpy.mockClear();
		anchorClickMock.mockClear();
		revokeObjectURLMock.mockClear();

		act(() => {
			result.current.exportAll();
		});

		// Export is synchronous, so we can check immediately
		expect(createElementSpy).toHaveBeenCalledWith('a');
		expect(appendChildSpy).toHaveBeenCalledWith(mockAnchor);
		expect(anchorClickMock).toHaveBeenCalled();
		expect(removeChildSpy).toHaveBeenCalledWith(mockAnchor);
		expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url');
	});

	it('should reset all state', async () => {
		const { result } = renderHook(() => usePlay(), { wrapper });

		// Add items and lines
		act(() => {
			result.current.addChordBinItem();
			result.current.addNotepadLine();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems.length).toBeGreaterThan(0);
			expect(result.current.notepadLines.length).toBeGreaterThan(0);
		});

		act(() => {
			result.current.reset();
		});

		await waitFor(() => {
			expect(result.current.chordBinItems).toEqual([]);
			expect(result.current.notepadLines).toEqual([]);
		});
	});
});
