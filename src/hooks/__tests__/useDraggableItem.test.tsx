import { useDraggableItem } from '@/hooks';
import { renderHook } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { describe, expect, it } from 'vitest';

function wrapper({ children }: { children: React.ReactNode }) {
	return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

describe('useDraggableItem', () => {
	it('should return isDragging, isOver, and dragRef when used within DndProvider', () => {
		const onReorder = () => {};
		const { result } = renderHook(
			() =>
				useDraggableItem({
					type: 'test-item',
					id: 1,
					index: 0,
					onReorder,
				}),
			{ wrapper }
		);

		expect(result.current.isDragging).toBe(false);
		expect(result.current.isOver).toBe(false);
		expect(typeof result.current.dragRef).toBe('function');
	});

	it('should accept a node in dragRef without throwing', () => {
		const onReorder = () => {};
		const { result } = renderHook(
			() =>
				useDraggableItem({
					type: 'test-item',
					id: 1,
					index: 0,
					onReorder,
				}),
			{ wrapper }
		);

		const div = document.createElement('div');
		expect(() => result.current.dragRef(div)).not.toThrow();
		expect(() => result.current.dragRef(null)).not.toThrow();
	});
});
