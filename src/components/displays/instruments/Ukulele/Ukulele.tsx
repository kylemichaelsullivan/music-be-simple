import { rangeOfLength } from '@/utils/notes';
import FretNumbers from '../FretNumbers';
import FretString from '../FretString';
import Label from '../Label';

export default function Ukelele() {
	// G C E A
	const openNotes = [9, 4, 0, 7];

	return (
		<div className='Ukelele flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Ukulele' title='Ukelele' />
			<div className='flex w-full flex-col'>
				<FretNumbers />

				<div className='fretboard border border-black'>
					{rangeOfLength(openNotes.length).map((i) => (
						<FretString openNote={openNotes[i]} key={`ukelele-string-${i}`} />
					))}
				</div>
			</div>
		</div>
	);
}
