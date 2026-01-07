import { useState } from 'react';
import AddNotepadLine from './AddNotepadLine';
import NotepadLine from './NotepadLine';

export default function Notepad() {
	const [lines, setLines] = useState<number[]>([]);

	const handleAddLine = () => {
		setLines((prev) => [...prev, Date.now()]);
	};

	const handleRemoveLine = (id: number) => {
		setLines((prev) => prev.filter((lineId) => lineId !== id));
	};

	return (
		<div className='Notepad flex flex-col gap-4 border p-4'>
			<h2 className='text-2xl font-bold text-center'>Notepad</h2>

			{lines.map((id) => (
				<NotepadLine onRemove={() => handleRemoveLine(id)} id={id} key={id} />
			))}

			<AddNotepadLine onAdd={handleAddLine} />
		</div>
	);
}
