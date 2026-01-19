import { useTunings } from '@/hooks';
import { rangeOfLength } from '@/utils';
import { FretNumbers } from '../FretNumbers';
import { FretString } from '../FretString';
import { Label } from '../Label';

export function Mandolin() {
	// G, D, A, E
	const { getTuning, openTuningModal } = useTunings();
	const openNotes = getTuning('Mandolin');

	return (
		<div className='Mandolin flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Mandolin' title='Mandolin' onTuningClick={() => openTuningModal('Mandolin')} />
			<div className='flex w-full flex-col'>
				<FretNumbers />

				<div className='fretboard border border-black'>
					{rangeOfLength(openNotes.length).map((i) => (
						<FretString openNote={openNotes[i]} key={`mandolin-string-${i}`} />
					))}
				</div>
			</div>
		</div>
	);
}
