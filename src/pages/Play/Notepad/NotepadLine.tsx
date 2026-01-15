import { RemoveButton } from '@/components/buttons';
import { useDragDropClassName, useDraggableItem } from '@/hooks';
import type { NotepadLineData } from '@/types';

type NotepadLineProps = {
	line: NotepadLineData;
	index: number;
	onRemove: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

export function NotepadLine({ line, index, onRemove, onReorder }: NotepadLineProps) {
	const ID = line.id.toString();

	const { isDragging, isOver, dragRef } = useDraggableItem({
		type: 'notepad-line',
		id: line.id,
		index,
		onReorder,
	});

	const className = useDragDropClassName({
		baseClasses:
			'NotepadLine relative flex justify-start items-center gap-2 border border-lg p-2 pr-10 transition-all duration-200',
		isDragging,
		isOver,
	});

	return (
		<div className={className} ref={dragRef} id={`notepad-line-${ID}`}>
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
