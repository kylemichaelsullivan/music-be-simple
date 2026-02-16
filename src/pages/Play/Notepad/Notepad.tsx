import { useDropZone, usePlay } from '@/hooks';
import { NotepadContent } from '.';

export function Notepad() {
	const {
		notepadItems,
		addNotepadLine,
		addNotepadLineChords,
		addNotepadLineLyrics,
		addNotepadTitle,
		removeNotepadItem,
		reorderNotepadItems,
	} = usePlay();

	const { isOver, dropRef } = useDropZone({
		accept: 'notepad-line',
	});

	return (
		<div className='Notepad flex flex-col gap-4 items-center border shadow-xl p-4'>
			<h2 className='text-2xl font-bold text-center'>Notepad</h2>
			<NotepadContent
				notepadItems={notepadItems}
				isOver={isOver}
				dropRef={dropRef}
				onAddTitle={addNotepadTitle}
				onAddLine={addNotepadLine}
				onAddLineChords={addNotepadLineChords}
				onAddLineLyrics={addNotepadLineLyrics}
				onReorder={reorderNotepadItems}
				onRemoveItem={removeNotepadItem}
			/>
		</div>
	);
}
