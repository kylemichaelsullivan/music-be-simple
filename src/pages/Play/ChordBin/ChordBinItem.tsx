import { EditButton, RemoveButton } from '@/components/buttons';
import { useChords, useGlobals, usePlay } from '@/hooks';
import type { ChordBinItemData } from '@/types';
import { getChordSymbol, getNote } from '@/utils';
import { useDrag, useDrop } from 'react-dnd';

type ChordBinItemProps = {
	item: ChordBinItemData;
	index: number;
	onRemove: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

export function ChordBinItem({ item, index, onRemove, onReorder }: ChordBinItemProps) {
	const { usingFlats } = useGlobals();
	const { showNerdMode } = useChords();
	const { setEditingItemId, activeInstrument } = usePlay();
	const ID = item.id.toString();

	const note = getNote(item.tonic, usingFlats);
	const symbol = getChordSymbol(item.variant, showNerdMode);
	const chordName = item.variant === 'major' ? note : `${note}${symbol}`;

	const onEdit = () => {
		setEditingItemId(item.id);
	};

	const [{ isDragging }, drag] = useDrag({
		type: 'chord-bin-item',
		item: { id: item.id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [{ isOver }, drop] = useDrop({
		accept: 'chord-bin-item',
		hover: (draggedItem: { id: number; index: number }) => {
			if (draggedItem.id !== item.id && draggedItem.index !== index) {
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
			'ChordBinItem relative flex justify-center items-start border border-lg p-2 transition-all duration-200';
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
			id={`chord-bin-item-${ID}`}
		>
			{activeInstrument !== null && <EditButton title={`Edit ${chordName}`} onFxn={onEdit} />}

			<span className='text-sm'>{chordName}</span>

			<RemoveButton title={`Remove ${chordName}`} onFxn={onRemove} />
		</div>
	);
}
