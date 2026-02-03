import { useChords, useDragDropClassName, useGlobals, usePlay } from '@/hooks';
import type { ChordBinItemData } from '@/types';
import { getChordSymbol, getNote } from '@/utils';
import type { RefObject } from 'react';
import { useDrop } from 'react-dnd';

type NotepadLineChordProps = {
	lineId: number;
	slotIndex: number;
	chordId: number | null;
	chordBinItems: ChordBinItemData[];
};

type DraggedChordItem = {
	id: number;
	index: number;
};

export function NotepadLineChord({
	lineId,
	slotIndex,
	chordId,
	chordBinItems,
}: NotepadLineChordProps) {
	const { usingFlats } = useGlobals();
	const { showNerdMode } = useChords();
	const { updateNotepadLineChord } = usePlay();

	const chordItem = chordId ? chordBinItems.find((item) => item.id === chordId) : null;

	const [{ isOver }, drop] = useDrop({
		accept: 'chord-bin-item',
		drop: (draggedItem: DraggedChordItem) => {
			updateNotepadLineChord(lineId, slotIndex, draggedItem.id);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const className = useDragDropClassName({
		baseClasses:
			'NotepadLineChord flex justify-center items-center text-center text-sm min-h-[2rem] transition-all duration-200',
		isOver,
	});

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		updateNotepadLineChord(lineId, slotIndex, null);
	};

	let displayText = '';
	if (chordItem) {
		const note = getNote(chordItem.tonic, usingFlats);
		const symbol = getChordSymbol(chordItem.variant, showNerdMode);
		const computedChordName = chordItem.variant === 'major' ? note : `${note}${symbol}`;
		displayText = chordItem.name ?? computedChordName;
	}

	return (
		<div className={className} ref={drop as unknown as RefObject<HTMLDivElement>}>
			{chordItem && (
				<button
					type='button'
					className='w-full h-full flex items-center justify-center hover:bg-red-50 transition-colors'
					title={`Remove ${displayText}`}
					onClick={handleRemove}
				>
					{displayText}
				</button>
			)}
		</div>
	);
}
