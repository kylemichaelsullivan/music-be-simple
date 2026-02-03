import { EditButton, RemoveButton } from '@/components/buttons';
import { useChords, useDragDropClassName, useDraggableItem, useGlobals, usePlay } from '@/hooks';
import type { ChordBinItemData } from '@/types';
import { getChordSymbol, getNote } from '@/utils';

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
	const computedChordName = item.variant === 'major' ? note : `${note}${symbol}`;
	const chordName = item.name ?? computedChordName;

	const onEdit = () => {
		setEditingItemId(item.id);
	};

	const { isDragging, isOver, dragRef } = useDraggableItem({
		type: 'chord-bin-item',
		id: item.id,
		index,
		onReorder,
		customPreview: true,
	});

	const className = useDragDropClassName({
		baseClasses:
			'ChordBinItem relative flex justify-center items-start rounded-lg border p-2 transition-all duration-200',
		isDragging,
		isOver,
	});

	return (
		<div className={`${className} w-full min-w-0 overflow-hidden`} ref={dragRef} id={`chord-bin-item-${ID}`}>
			{activeInstrument !== null && <EditButton title={`Edit ${chordName}`} onFxn={onEdit} />}

			<span className='truncate text-sm'>{chordName}</span>

			<RemoveButton title={`Remove ${chordName}`} onFxn={onRemove} />
		</div>
	);
}
