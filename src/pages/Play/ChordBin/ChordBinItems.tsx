import { useDropZone, usePlay } from '@/hooks';
import clsx from 'clsx';
import { ChordBinItem } from '.';

export function ChordBinItems() {
	const { chordBinItems, removeChordBinItem, reorderChordBinItems } = usePlay();

	const { isOver, dropRef } = useDropZone({
		accept: 'chord-bin-item',
	});

	return (
		<div
			className={clsx(
				'ChordBinItems grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-4 items-start text-center transition-all duration-200',
				chordBinItems.length > 0 ? 'justify-items-start' : 'justify-items-center',
				isOver && 'bg-gray-50 p-2'
			)}
			ref={dropRef}
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
				<span className='col-span-full text-sm italic text-center'>add a chord</span>
			)}
		</div>
	);
}
