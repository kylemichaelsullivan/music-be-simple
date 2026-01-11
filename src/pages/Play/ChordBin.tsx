import { usePlay } from '@/hooks';
import { AddChordBinItem, ChordBinItems, InstrumentSelector } from './';

export function ChordBin() {
	const { addChordBinItem } = usePlay();

	return (
		<div className='ChordBin flex flex-col gap-4 border shadow-xl p-4'>
			<h2 className='text-2xl font-bold text-center'>Chord Bin</h2>
			<InstrumentSelector />

			<ChordBinItems />

			<AddChordBinItem onAdd={addChordBinItem} />
		</div>
	);
}
