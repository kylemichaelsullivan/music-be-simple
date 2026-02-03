import type { NoteIndex } from '@/types';
import { isValidNoteIndex, rangeOfLength } from '@/utils';
import { Fret, Nut } from '.';

type FretStringProps = {
	openNote: NoteIndex;
};

function FretString({ openNote }: FretStringProps) {
	const frets = 11;

	return (
		<div className={'FretString flex justify-evenly'}>
			<Nut note={openNote} />
			{rangeOfLength(frets)
				.map((i) => {
					const note = (openNote + 1 + i) % 12;
					return { note, i };
				})
				.filter((item): item is { note: NoteIndex; i: number } => isValidNoteIndex(item.note))
				.map(({ note, i }) => (
					<Fret note={note} key={`${openNote}-fret-${i}`} />
				))}
		</div>
	);
}

export { FretString };
