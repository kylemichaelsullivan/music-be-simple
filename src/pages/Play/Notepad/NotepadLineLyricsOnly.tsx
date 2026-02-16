import { RemoveButton } from '@/components/buttons';
import { useDragDropClassName, useDraggableItem, usePlay } from '@/hooks';
import type { NotepadLineData } from '@/types';
import { NotepadLineText } from '.';

type NotepadLineLyricsOnlyProps = {
	line: NotepadLineData;
	index: number;
	onRemove: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

export function NotepadLineLyricsOnly({
	line,
	index,
	onRemove,
	onReorder,
}: NotepadLineLyricsOnlyProps) {
	const ID = line.id.toString();
	const { updateNotepadLine } = usePlay();

	const { isDragging, isOver, dragRef } = useDraggableItem({
		type: 'notepad-line',
		id: line.id,
		index,
		onReorder,
	});

	const className = useDragDropClassName({
		baseClasses:
			'NotepadLineLyricsOnly relative flex flex-col justify-start items-center border border-lg p-2 pr-10 transition-all duration-200',
		isDragging,
		isOver,
	});

	return (
		<div className={className} ref={dragRef} id={`notepad-line-lyrics-${ID}`}>
			<div className='NotepadLineContent w-xl max-w-full flex flex-col gap-1'>
				<NotepadLineText
					text={line.text ?? ''}
					onTextChange={(text) => updateNotepadLine(line.id, text)}
				/>
			</div>
			<RemoveButton title={`Remove lyrics line ${ID}`} onFxn={onRemove} />
		</div>
	);
}
