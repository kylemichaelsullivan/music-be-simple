import { useDrop } from 'react-dnd';

type UseDropZoneOptions = {
	accept: string;
};

type UseDropZoneReturn = {
	isOver: boolean;
	dropRef: (node: HTMLElement | null) => void;
};

export function useDropZone({ accept }: UseDropZoneOptions): UseDropZoneReturn {
	const [{ isOver }, drop] = useDrop({
		accept,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const dropRef = (node: HTMLElement | null) => {
		drop(node);
	};

	return {
		isOver,
		dropRef,
	};
}
