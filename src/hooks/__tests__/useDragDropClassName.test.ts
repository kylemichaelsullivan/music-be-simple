import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDragDropClassName } from '../useDragDropClassName';

describe('useDragDropClassName', () => {
	it('should return baseClasses with default cursor-grab when not dragging or over', () => {
		const { result } = renderHook(() => useDragDropClassName({ baseClasses: 'item' }));
		expect(result.current).toContain('item');
		expect(result.current).toContain('cursor-grab');
		expect(result.current).not.toContain('opacity-50');
		expect(result.current).not.toContain('border-blue-500');
	});

	it('should add opacity-50 and cursor-grabbing when isDragging is true', () => {
		const { result } = renderHook(() =>
			useDragDropClassName({ baseClasses: 'item', isDragging: true })
		);
		expect(result.current).toContain('opacity-50');
		expect(result.current).toContain('cursor-grabbing');
		expect(result.current).toContain('shadow-lg');
	});

	it('should add border and bg when isOver is true and not dragging', () => {
		const { result } = renderHook(() =>
			useDragDropClassName({ baseClasses: 'item', isOver: true })
		);
		expect(result.current).toContain('border-blue-500');
		expect(result.current).toContain('border-2');
		expect(result.current).toContain('bg-blue-50');
	});

	it('should prefer isDragging over isOver when both are true', () => {
		const { result } = renderHook(() =>
			useDragDropClassName({
				baseClasses: 'item',
				isDragging: true,
				isOver: true,
			})
		);
		expect(result.current).toContain('opacity-50');
		expect(result.current).toContain('cursor-grabbing');
		expect(result.current).not.toContain('border-blue-500');
	});
});
