import { usePlay } from '@/hooks';
import { AddNotepadLine, InstrumentSelector, NotepadLine } from '..';

export function Notepad() {
	const { notepadLines, addNotepadLine, removeNotepadLine } = usePlay();

	return (
		<div className='Notepad flex flex-col gap-4 border shadow-xl p-4'>
			<h2 className='text-2xl font-bold text-center'>Notepad</h2>
			<InstrumentSelector />

			{notepadLines.map((line) => (
				<NotepadLine onRemove={() => removeNotepadLine(line.id)} line={line} key={line.id} />
			))}

			<AddNotepadLine onAdd={addNotepadLine} />
		</div>
	);
}
