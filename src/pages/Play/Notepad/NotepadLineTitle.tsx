import { RemoveButton } from '@/components/buttons';
import { useDragDropClassName, useDraggableItem, usePlay } from '@/hooks';
import type { NotepadLineTitleData } from '@/types';

type NotepadLineTitleProps = {
	titleItem: NotepadLineTitleData;
	index: number;
	onReorder: (fromIndex: number, toIndex: number) => void;
	onRemove: () => void;
};

export function NotepadLineTitle({ titleItem, index, onReorder, onRemove }: NotepadLineTitleProps) {
	const { updateNotepadTitle } = usePlay();

	const { isDragging, isOver, dragRef } = useDraggableItem({
		type: 'notepad-line',
		id: titleItem.id,
		index,
		onReorder,
	});

	const className = useDragDropClassName({
		baseClasses:
			'NotepadLineTitle relative flex flex-col justify-start items-center border border-slate-500 p-2 pr-10 transition-all duration-200',
		isDragging,
		isOver,
	});

	return (
		<div className={className} ref={dragRef} id={`notepad-title-${titleItem.id}`}>
			<input
				type='text'
				className='NotepadLineTitleText border border-transparent text-sm font-bold small-caps w-full p-2 hover:ring-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
				value={titleItem.title}
				placeholder='Section Title'
				aria-label='Section Title'
				onChange={(e) => updateNotepadTitle(titleItem.id, e.target.value)}
			/>
			<RemoveButton title={`Remove title ${titleItem.id}`} onFxn={onRemove} />
		</div>
	);
}
