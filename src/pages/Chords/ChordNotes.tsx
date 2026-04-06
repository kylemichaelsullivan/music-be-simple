import { memo } from 'react';
import type { NoteIndex } from '@/types';
import { ChordNote } from '.';

type ChordNotesProps = {
	notes: NoteIndex[];
};

const ChordNotes = memo(function ChordNotes({ notes }: ChordNotesProps) {
	return (
		<div className='ChordNotes grid grid-cols-7 col-span-6 gap-1 flex-auto sm:gap-2'>
			{notes.map((note: NoteIndex) => (
				<ChordNote note={note} key={`chord-note-${note}`} />
			))}
		</div>
	);
});

export { ChordNotes };
