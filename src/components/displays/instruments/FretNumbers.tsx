import { rangeOfLength } from '@/utils/notes';

export default function FretNumbers() {
	const dottedFretIndexes = [0, 2, 4, 6, 8];

	return (
		<div className='FretNumbers flex w-full justify-evenly bg-transparent'>
			{rangeOfLength(11).map((index) => (
				<div
					className={`${dottedFretIndexes.includes(index) ? 'text-black' : 'text-gray-400'} w-full text-center text-xs sm:text-base`}
					key={`fret-${index}`}
				>
					{index + 1}
				</div>
			))}
		</div>
	);
}
