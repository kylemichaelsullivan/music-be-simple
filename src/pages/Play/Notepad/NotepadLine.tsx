import { RemoveButton } from '@/components/buttons';
import { useDragDropClassName, useDraggableItem, usePlay } from '@/hooks';
import type { NotepadLineData } from '@/types';
import { NotepadLineChords, NotepadLineText } from '.';

type NotepadLineProps = {
	line: NotepadLineData;
	index: number;
	onRemove: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

export function NotepadLine({ line, index, onRemove, onReorder }: NotepadLineProps) {
	const ID = line.id.toString();
	const { chordBinItems, updateNotepadLine } = usePlay();

	const { isDragging, isOver, dragRef } = useDraggableItem({
		type: 'notepad-line',
		id: line.id,
		index,
		onReorder,
	});

	const className = useDragDropClassName({
		baseClasses:
			'NotepadLine relative flex flex-col justify-start items-center border border-lg p-2 pr-10 transition-all duration-200',
		isDragging,
		isOver,
	});

	return (
		<div className={className} ref={dragRef} id={`notepad-line-${ID}`}>
			<div className='NotepadLineContent w-xl max-w-full flex flex-col gap-1'>
				<NotepadLineChords lineId={line.id} chords={line.chords} chordBinItems={chordBinItems} />
				<NotepadLineText
					text={line.text ?? ''}
					onTextChange={(text) => {
						updateNotepadLine(line.id, text);
					}}
				/>
			</div>

			<RemoveButton title={`Remove Notepad Line ${ID}`} onFxn={onRemove} />
		</div>
	);
}
