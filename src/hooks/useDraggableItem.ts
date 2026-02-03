import { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

type DraggableItem = {
	id: number;
	index: number;
};

type UseDraggableItemOptions = {
	type: string;
	id: number;
	index: number;
	onReorder: (fromIndex: number, toIndex: number) => void;
	// When true, suppresses the default drag image so a custom DragLayer can be used.
	customPreview?: boolean;
};

type UseDraggableItemReturn = {
	isDragging: boolean;
	isOver: boolean;
	dragRef: (node: HTMLElement | null) => void;
};

export function useDraggableItem({
	type,
	id,
	index,
	onReorder,
	customPreview = false,
}: UseDraggableItemOptions): UseDraggableItemReturn {
	const [{ isDragging }, drag, preview] = useDrag({
		type,
		item: { id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		if (customPreview) {
			preview(getEmptyImage(), { captureDraggingState: true });
		}
	}, [customPreview, preview]);

	const [{ isOver }, drop] = useDrop({
		accept: type,
		hover: (draggedItem: DraggableItem) => {
			if (draggedItem.id !== id && draggedItem.index !== index) {
				onReorder(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const dragRef = (node: HTMLElement | null) => {
		drag(drop(node));
	};

	return {
		isDragging,
		isOver,
		dragRef,
	};
}
