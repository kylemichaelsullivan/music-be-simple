import type { NoteIndex } from '@/types';
import { isValidNoteIndex, rangeOfLength } from '@/utils';
import clsx from 'clsx';

export default function FretNumbers() {
	const dottedFretIndexes: NoteIndex[] = [0, 2, 4, 6, 8];

	return (
		<div className='FretNumbers flex w-full justify-evenly bg-transparent'>
			{rangeOfLength(11)
				.filter(isValidNoteIndex)
				.map((index: NoteIndex) => (
					<div
						className={clsx(
							'w-full text-center text-xs sm:text-base',
							dottedFretIndexes.includes(index) ? 'text-black' : 'text-gray-400'
						)}
						key={`fret-${index}`}
					>
						{index + 1}
					</div>
				))}
		</div>
	);
}
