import type { ChordBinItemData } from '@/types';
import { rangeOfLength } from '@/utils';
import { NotepadLineChord } from '.';

type NotepadLineChordsProps = {
	lineId: number;
	chords: (number | null)[];
	chordBinItems: ChordBinItemData[];
};

const CHORD_SLOTS = 36;

export function NotepadLineChords({ lineId, chords, chordBinItems }: NotepadLineChordsProps) {
	return (
		<div className='NotepadLineChords grid grid-cols-36 items-center w-full'>
			{rangeOfLength(CHORD_SLOTS).map((slot) => (
				<NotepadLineChord
					chordId={chords[slot] ?? null}
					chordBinItems={chordBinItems}
					lineId={lineId}
					slotIndex={slot}
					key={`${lineId}-slot-${slot}`}
				/>
			))}
		</div>
	);
}
