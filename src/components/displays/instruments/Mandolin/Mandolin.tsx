import type { NoteIndex } from '@/types';
import { rangeOfLength } from '@/utils';
import FretNumbers from '../FretNumbers';
import FretString from '../FretString';
import Label from '../Label';

export default function Mandolin() {
	// G D A E
	const openNotes: NoteIndex[] = [4, 9, 2, 7];

	return (
		<div className='Mandolin flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Mandolin' title='Mandolin' />
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
