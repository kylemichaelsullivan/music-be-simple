import { rangeOfLength } from '@/utils/notes';
import FretNumbers from '../FretNumbers';
import FretString from '../FretString';
import Label from '../Label';

export default function Guitar() {
	// E A D G B E
	const openNotes = [4, 11, 7, 2, 9, 4];

	return (
		<div className='Guitar flex w-full justify-center gap-2 sm:gap-4'>
			<Label icon='Guitar' title='Guitar' />
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
