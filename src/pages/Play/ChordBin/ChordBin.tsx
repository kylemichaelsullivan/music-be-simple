import { usePlay } from '@/hooks';
import { AddChordBinItem, ChordBinEditor, ChordBinItems } from '.';
import { InstrumentSelector } from '../InstrumentSelector';

export function ChordBin() {
	const { addChordBinItem, chordBinItems, editingItemId, setEditingItemId } = usePlay();

	const editingItem = editingItemId
		? chordBinItems.find((item) => item.id === editingItemId)
		: null;

	const onCloseEditor = () => {
		setEditingItemId(null);
	};

	return (
		<div className='ChordBin relative flex flex-col gap-4 border shadow-xl p-4'>
			<h2 className='text-2xl font-bold text-center'>Chord Bin</h2>
			<InstrumentSelector />

			<ChordBinItems />

			<AddChordBinItem onAdd={addChordBinItem} />

			{editingItem && <ChordBinEditor item={editingItem} onClose={onCloseEditor} />}
		</div>
	);
}
