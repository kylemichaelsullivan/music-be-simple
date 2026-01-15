import { useDrag, useDrop } from 'react-dnd';

type DraggableItem = {
	id: number;
	index: number;
};

type UseDraggableItemOptions = {
	type: string;
	id: number;
	index: number;
	onReorder: (fromIndex: number, toIndex: number) => void;
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
}: UseDraggableItemOptions): UseDraggableItemReturn {
	const [{ isDragging }, drag] = useDrag({
		type,
		item: { id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

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
