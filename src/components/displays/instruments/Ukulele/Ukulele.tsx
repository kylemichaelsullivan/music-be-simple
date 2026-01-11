import type { NoteIndex } from '@/types';
import { rangeOfLength } from '@/utils';
import { FretNumbers } from '../FretNumbers';
import { FretString } from '../FretString';
import { Label } from '../Label';

export function Ukulele() {
	// G C E A
	const openNotes: NoteIndex[] = [9, 4, 0, 7];

	return (
		<div className='Ukulele flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Ukulele' title='Ukulele' />
			<div className='flex w-full flex-col'>
				<FretNumbers />

				<div className='fretboard border border-black'>
					{rangeOfLength(openNotes.length).map((i) => (
						<FretString openNote={openNotes[i]} key={`ukulele-string-${i}`} />
					))}
				</div>
			</div>
		</div>
	);
}
