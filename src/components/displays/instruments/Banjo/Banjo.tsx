import { useTunings } from '@/hooks';
import type { NoteIndex } from '@/types';
import { rangeOfLength } from '@/utils';
import { FretNumbers } from '../FretNumbers';
import { FretString } from '../FretString';
import { Label } from '../Label';
import { DroneString } from '.';

export function Banjo() {
	// [G], D, B, G, D
	const { getTuning, openTuningModal } = useTunings();
	const tuning = getTuning('Banjo');
	const openNotes = tuning.slice(0, 4) as NoteIndex[];
	const droneNote = tuning[4] as NoteIndex;

	return (
		<div className='Banjo flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Banjo' title='Banjo' onTuningClick={() => openTuningModal('Banjo')} />
			<div className='flex w-full flex-col'>
				<FretNumbers />
				<div className='fretboard flex w-full flex-col'>
					{rangeOfLength(openNotes.length).map((i) => (
						<FretString openNote={openNotes[i]} key={`banjo-string-${i}`} />
					))}
					<DroneString openNote={droneNote} key={`drone-${droneNote}`} />
				</div>
			</div>
		</div>
	);
}
