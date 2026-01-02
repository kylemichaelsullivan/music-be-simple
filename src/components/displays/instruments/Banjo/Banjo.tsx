import type { NoteIndex } from '@/types';
import { rangeOfLength } from '@/utils';
import FretNumbers from '../FretNumbers';
import FretString from '../FretString';
import Label from '../Label';
import DroneString from './DroneString';

export default function Banjo() {
	// [G] D B G D
	const openNotes: NoteIndex[] = [2, 11, 7, 2];

	return (
		<div className='Banjo flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Banjo' title='Banjo' />
			<div className='flex w-full flex-col'>
				<FretNumbers />
				<div className='fretboard flex w-full flex-col'>
					{rangeOfLength(openNotes.length).map((i) => (
						<FretString openNote={openNotes[i]} key={`banjo-string-${i}`} />
					))}
					<DroneString openNote={7} key={`${7}-${4}`} />
				</div>
			</div>
		</div>
	);
}
