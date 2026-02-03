import { useDropZone } from '@/hooks';
import { renderHook } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { describe, expect, it } from 'vitest';

function wrapper({ children }: { children: React.ReactNode }) {
	return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

describe('useDropZone', () => {
	it('should return isOver and dropRef when used within DndProvider', () => {
		const { result } = renderHook(() => useDropZone({ accept: 'test-type' }), { wrapper });

		expect(result.current.isOver).toBe(false);
		expect(typeof result.current.dropRef).toBe('function');
	});

	it('should accept a node in dropRef without throwing', () => {
		const { result } = renderHook(() => useDropZone({ accept: 'test-type' }), { wrapper });

		const div = document.createElement('div');
		expect(() => result.current.dropRef(div)).not.toThrow();
		expect(() => result.current.dropRef(null)).not.toThrow();
	});
});
