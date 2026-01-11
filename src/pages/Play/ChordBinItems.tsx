import { usePlay } from '@/hooks';
import { ChordBinItem } from './';

export function ChordBinItems() {
	const { chordBinItems, removeChordBinItem } = usePlay();

	return (
		<div className='ChordBinItems grid gap-4'>
			{chordBinItems.map((item) => (
				<ChordBinItem item={item} onRemove={() => removeChordBinItem(item.id)} key={item.id} />
			))}
		</div>
	);
}
