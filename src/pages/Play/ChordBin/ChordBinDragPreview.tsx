import { useChords, useGlobals, usePlay } from '@/hooks';
import type { ChordBinItemData } from '@/types';
import { getChordSymbol, getNote } from '@/utils';
import { useDragLayer } from 'react-dnd';

type DragItem = { id: number; index: number };

function getChordName(item: ChordBinItemData, usingFlats: boolean, showNerdMode: boolean): string {
	const note = getNote(item.tonic, usingFlats);
	const symbol = getChordSymbol(item.variant, showNerdMode);
	const computedChordName = item.variant === 'major' ? note : `${note}${symbol}`;
	return item.name ?? computedChordName;
}

export function ChordBinDragPreview() {
	const { clientOffset, isDragging, item, itemType } = useDragLayer((monitor) => ({
		clientOffset: monitor.getClientOffset(),
		isDragging: monitor.isDragging(),
		item: monitor.getItem() as DragItem | null,
		itemType: monitor.getItemType(),
	}));

	const { chordBinItems } = usePlay();
	const { usingFlats } = useGlobals();
	const { showNerdMode } = useChords();

	if (!isDragging || itemType !== 'chord-bin-item' || item === null || clientOffset === null) {
		return null;
	}

	const binItem = chordBinItems.find((i) => i.id === item.id);
	if (binItem === undefined) {
		return null;
	}

	const chordName = getChordName(binItem, usingFlats, showNerdMode);

	return (
		<div
			className="ChordBinDragPreview pointer-events-none fixed left-0 top-0 z-50"
			style={{
				transform: `translate(${clientOffset.x}px, ${clientOffset.y}px) translate(-50%, -50%)`,
			}}
		>
			<div className="flex justify-center bg-white rounded border border-lg border-gray-300 shadow-lg max-w-24 px-2 py-1">
				<span className="truncate text-sm">{chordName}</span>
			</div>
		</div>
	);
}
