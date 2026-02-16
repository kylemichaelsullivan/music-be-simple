import { RemoveButton } from '@/components/buttons';
import { useChords, useDragDropClassName, useDraggableItem, useGlobals, usePlay } from '@/hooks';
import type { NotepadLineData } from '@/types';
import { getChordSymbol, getNote } from '@/utils';
import type { RefObject } from 'react';
import { useDrag, useDrop } from 'react-dnd';

type NotepadLineChordsOnlyProps = {
	line: NotepadLineData;
	index: number;
	onRemove: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

type DraggedChordBinItem = {
	id: number;
	index: number;
};

type DraggedNotepadLineChordItem = {
	lineId: number;
	fromFilledIndex: number;
};

type ChordChipProps = {
	lineId: number;
	filledIndex: number;
	chordId: number;
	label: string;
	onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ChordChip({ lineId, filledIndex, chordId, label, onRemove }: ChordChipProps) {
	const { reorderNotepadLineChords } = usePlay();

	const [{ isDragging }, drag] = useDrag({
		type: 'notepad-line-chord',
		item: { lineId, fromFilledIndex: filledIndex },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	});

	const [{ isOver }, drop] = useDrop({
		accept: 'notepad-line-chord',
		hover: (draggedItem: DraggedNotepadLineChordItem) => {
			if (draggedItem.lineId !== lineId || draggedItem.fromFilledIndex === filledIndex) return;
			reorderNotepadLineChords(lineId, draggedItem.fromFilledIndex, filledIndex);
			draggedItem.fromFilledIndex = filledIndex;
		},
		collect: (monitor) => ({ isOver: monitor.isOver() }),
	});

	const ref = (node: HTMLButtonElement | null) => {
		drag(drop(node));
	};

	return (
		<button
			ref={ref}
			type='button'
			className={`px-2 py-1 border rounded text-sm transition-colors ${
				isDragging ? 'opacity-50' : ''
			} ${isOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:bg-red-50'}`}
			title={`Remove ${label}. Drag to reorder.`}
			onClick={onRemove}
		>
			{label}
		</button>
	);
}

export function NotepadLineChordsOnly({
	line,
	index,
	onRemove,
	onReorder,
}: NotepadLineChordsOnlyProps) {
	const ID = line.id.toString();
	const { chordBinItems, updateNotepadLineChord } = usePlay();
	const { usingFlats } = useGlobals();
	const { showNerdMode } = useChords();

	const { isDragging, isOver: isLineOver, dragRef } = useDraggableItem({
		type: 'notepad-line',
		id: line.id,
		index,
		onReorder,
	});

	const [{ isOver }, drop] = useDrop({
		accept: 'chord-bin-item',
		drop: (draggedItem: DraggedChordBinItem) => {
			const firstEmpty = line.chords.findIndex((c) => c === null);
			const slotIndex = firstEmpty === -1 ? line.chords.length - 1 : firstEmpty;
			updateNotepadLineChord(line.id, slotIndex, draggedItem.id);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const className = useDragDropClassName({
		baseClasses:
			'NotepadLineChordsOnly relative flex flex-col justify-start items-center border border-lg p-2 pr-10 transition-all duration-200',
		isDragging,
		isOver: isLineOver || isOver,
	});

	const filledChords = line.chords
		.map((chordId, slotIndex) => ({ chordId, slotIndex }))
		.filter((entry) => entry.chordId !== null) as { chordId: number; slotIndex: number }[];

	const renderChordLabel = (chordId: number) => {
		const chordItem = chordBinItems.find((item) => item.id === chordId);
		if (!chordItem) return '';
		const note = getNote(chordItem.tonic, usingFlats);
		const symbol = getChordSymbol(chordItem.variant, showNerdMode);
		const computedChordName = chordItem.variant === 'major' ? note : `${note}${symbol}`;
		return chordItem.name ?? computedChordName;
	};

	const handleRemoveChord =
		(slotIndex: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			updateNotepadLineChord(line.id, slotIndex, null);
		};

	return (
		<div className={className} ref={dragRef} id={`notepad-line-chords-${ID}`}>
			<div
				className='NotepadLineContent w-xl max-w-full flex flex-col gap-1 min-h-10'
				ref={drop as unknown as RefObject<HTMLDivElement>}
			>
				<div className='NotepadLineChords flex flex-wrap gap-2 items-center w-full'>
					{filledChords.map(({ chordId, slotIndex }, filledIndex) => (
						<ChordChip
							key={`${line.id}-slot-${slotIndex}`}
							lineId={line.id}
							filledIndex={filledIndex}
							chordId={chordId}
							label={renderChordLabel(chordId)}
							onRemove={handleRemoveChord(slotIndex)}
						/>
					))}
				</div>
			</div>
			<RemoveButton title={`Remove chords line ${ID}`} onFxn={onRemove} />
		</div>
	);
}
