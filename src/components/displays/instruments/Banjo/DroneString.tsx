import type { NoteIndex } from '@/types';
import { isValidNoteIndex, rangeOfLength } from '@/utils';
import { Fret } from '../Fret';
import { Nut } from '../Nut';
import { SkippedFret } from '.';

type DroneStringProps = {
	openNote: NoteIndex;
};

export function DroneString({ openNote }: DroneStringProps) {
	const frets = 6;

	return (
		<div className='DroneString flex justify-evenly items-center'>
			{rangeOfLength(5).map((i) => (
				<SkippedFret key={`drone-skipped-${i}`} />
			))}

			<Nut note={openNote} />

			{rangeOfLength(frets)
				.map((i) => {
					const note = (openNote + 1 + i) % 12;
					return { note, i };
				})
				.filter((item): item is { note: NoteIndex; i: number } => isValidNoteIndex(item.note))
				.map(({ note, i }) => (
					<Fret note={note} key={`drone-fret-${i}`} />
				))}
		</div>
	);
}
