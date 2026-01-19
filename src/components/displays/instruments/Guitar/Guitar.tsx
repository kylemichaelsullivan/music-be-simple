import { useTunings } from '@/hooks';
import type { NoteIndex } from '@/types';
import { rangeOfLength } from '@/utils';
import { FretNumbers } from '../FretNumbers';
import { FretString } from '../FretString';
import { Label } from '../Label';

export function Guitar() {
	// E, A, D, G, B, E
	const { getTuning, openTuningModal } = useTunings();
	const openNotes: NoteIndex[] = getTuning('Guitar');

	return (
		<div className='Guitar flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Guitar' title='Guitar' onTuningClick={() => openTuningModal('Guitar')} />
			<div className='flex w-full flex-col'>
				<FretNumbers />

				<div className='fretboard border border-black'>
					{rangeOfLength(openNotes.length).map((i) => (
						<FretString openNote={openNotes[i]} key={`guitar-string-${i}`} />
					))}
				</div>
			</div>
		</div>
	);
}
