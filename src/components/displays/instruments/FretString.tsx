import { rangeOfLength } from '@/utils/notes';
import Fret from './Fret';
import Nut from './Nut';

type FretStringProps = {
	openNote: number;
};

function FretString({ openNote }: FretStringProps) {
	const frets = 11;

	return (
		<div className={'FretString flex justify-evenly'}>
			<Nut note={openNote} />
			{rangeOfLength(frets).map((i) => (
				<Fret note={(openNote + 1 + i) % 12} key={`${openNote}-fret-${i}`} />
			))}
		</div>
	);
}

export default FretString;
