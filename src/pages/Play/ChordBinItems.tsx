import AddChordBinItem from '@/pages/Play/AddChordBinItem';
import ChordBinItem from '@/pages/Play/ChordBinItem';
import { useState } from 'react';

export default function ChordBinItems() {
	const [items, setItems] = useState<number[]>([]);

	const handleAddItem = () => {
		setItems((prev) => [...prev, Date.now()]);
	};

	const handleRemoveItem = (id: number) => {
		setItems((prev) => prev.filter((itemId) => itemId !== id));
	};

	return (
		<div className='ChordBinItems grid grid-cols-3 gap-4 justify-items-center'>
			{items.map((id) => (
				<ChordBinItem onRemove={() => handleRemoveItem(id)} id={id} key={id} />
			))}

			<AddChordBinItem onAdd={handleAddItem} />
		</div>
	);
}
