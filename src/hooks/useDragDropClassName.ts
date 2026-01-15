type UseDragDropClassNameOptions = {
	baseClasses: string;
	isDragging?: boolean;
	isOver?: boolean;
};

export function useDragDropClassName({
	baseClasses,
	isDragging = false,
	isOver = false,
}: UseDragDropClassNameOptions): string {
	if (isDragging) {
		return `${baseClasses} opacity-50 cursor-grabbing shadow-lg`;
	}
	if (isOver) {
		return `${baseClasses} cursor-grab border-blue-500 border-2 bg-blue-50`;
	}
	return `${baseClasses} cursor-grab hover:shadow-md hover:border-gray-400`;
}
