import { useInstrumentNotes } from '@/hooks';
import type { NoteIndex } from '@/types';
import { isValidNoteIndex, rangeOfLength } from '@/utils';
import Key from './Key';

export default function Piano() {
	const keys = 12;
	const blackKeys: NoteIndex[] = [1, 3, 6, 8, 10];

	const { notes } = useInstrumentNotes();

	return (
		<div className={'Piano relative flex min-h-24 w-full justify-center'}>
			{rangeOfLength(keys)
				.filter(isValidNoteIndex)
				.map((note) => (
					<Key
						isBlack={blackKeys.includes(note)}
						note={note}
						isAllowed={notes.includes(note)}
						key={`note-${note}`}
					/>
				))}
		</div>
	);
}
