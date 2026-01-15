import { usePlay } from '@/hooks';
import { useDrop } from 'react-dnd';
import { ChordBinItem } from '..';

export function ChordBinItems() {
	const { chordBinItems, removeChordBinItem, reorderChordBinItems } = usePlay();

	const [{ isOver }, drop] = useDrop({
		accept: 'chord-bin-item',
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<div
			className={`ChordBinItems grid gap-4 transition-all duration-200 ${isOver ? 'bg-gray-50 rounded-lg p-2' : ''}`}
			ref={(node) => {
				drop(node);
			}}
		>
			{chordBinItems.length > 0 ? (
				chordBinItems.map((item, index) => (
					<ChordBinItem
						item={item}
						index={index}
						onReorder={reorderChordBinItems}
						onRemove={() => removeChordBinItem(item.id)}
						key={item.id}
					/>
				))
			) : (
				<span className='text-sm italic text-center'>add a chord</span>
			)}
		</div>
	);
}
