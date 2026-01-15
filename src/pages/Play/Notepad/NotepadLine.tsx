import { RemoveButton } from '@/components/buttons';
import type { NotepadLineData } from '@/types';
import { useDrag, useDrop } from 'react-dnd';

type NotepadLineProps = {
	line: NotepadLineData;
	index: number;
	onRemove: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

export function NotepadLine({ line, index, onRemove, onReorder }: NotepadLineProps) {
	const ID = line.id.toString();

	const [{ isDragging }, drag] = useDrag({
		type: 'notepad-line',
		item: { id: line.id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [{ isOver }, drop] = useDrop({
		accept: 'notepad-line',
		hover: (draggedItem: { id: number; index: number }) => {
			if (draggedItem.id !== line.id && draggedItem.index !== index) {
				onReorder(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const getClassName = () => {
		const baseClasses =
			'NotepadLine relative flex justify-start items-center gap-2 border border-lg p-2 pr-10 transition-all duration-200';
		if (isDragging) {
			return `${baseClasses} opacity-50 cursor-grabbing shadow-lg`;
		}
		if (isOver) {
			return `${baseClasses} cursor-grab border-blue-500 border-2 bg-blue-50`;
		}
		return `${baseClasses} cursor-grab hover:shadow-md hover:border-gray-400`;
	};

	return (
		<div
			className={getClassName()}
			ref={(node) => {
				drag(drop(node));
			}}
			id={`notepad-line-${ID}`}
		>
			<input
				type='text'
				className='text-sm w-full p-2'
				value={line.content || `Notepad Line ${ID}`}
				onChange={(e) => {
					console.log('change', e.target.value);
				}}
			/>

			<RemoveButton title={`Remove Notepad Line ${ID}`} onFxn={onRemove} />
		</div>
	);
}
