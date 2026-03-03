import { useInstrumentNotes } from '@/hooks';
import type { NoteIndex } from '@/types';
import { rangeOfLength } from '@/utils';
import { Key } from '.';

const KEYS_PER_OCTAVE = 12;
const OCTAVES = 2;
const TOTAL_KEYS = KEYS_PER_OCTAVE * OCTAVES;
const BLACK_KEYS: NoteIndex[] = [1, 3, 6, 8, 10];

export function Piano() {
	const { notes } = useInstrumentNotes();

	return (
		<div className={'Piano relative flex justify-center w-full min-h-24'}>
			{rangeOfLength(TOTAL_KEYS).map((i) => {
				const note = (i % KEYS_PER_OCTAVE) as NoteIndex;
				return (
					<Key
						isBlack={BLACK_KEYS.includes(note)}
						note={note}
						isAllowed={notes.includes(note)}
						key={`note-${i}`}
					/>
				);
			})}
		</div>
	);
}
