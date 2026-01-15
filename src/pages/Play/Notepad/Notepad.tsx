import { usePlay } from '@/hooks';
import { useDrop } from 'react-dnd';
import { AddNotepadLine, InstrumentSelector, NotepadLine } from '..';

export function Notepad() {
	const { notepadLines, addNotepadLine, removeNotepadLine, reorderNotepadLines } = usePlay();

	const [{ isOver }, drop] = useDrop({
		accept: 'notepad-line',
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<div className='Notepad flex flex-col gap-4 border shadow-xl p-4'>
			<h2 className='text-2xl font-bold text-center'>Notepad</h2>
			<InstrumentSelector />

			<div
				className={`flex flex-col gap-4 transition-all duration-200 ${isOver ? 'bg-gray-50 rounded-lg p-2' : ''}`}
				ref={(node) => {
					drop(node);
				}}
			>
				{notepadLines.length > 0 ? (
					notepadLines.map((line, index) => (
						<NotepadLine
							line={line}
							index={index}
							onReorder={reorderNotepadLines}
							onRemove={() => removeNotepadLine(line.id)}
							key={line.id}
						/>
					))
				) : (
					<span className='text-sm italic text-center'>add a line</span>
				)}
			</div>

			<AddNotepadLine onAdd={addNotepadLine} />
		</div>
	);
}
