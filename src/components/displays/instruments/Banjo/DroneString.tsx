import { rangeOfLength } from '@/utils/notes';
import Fret from '../Fret';
import Nut from '../Nut';
import SkippedFret from './SkippedFret';

type DroneStringProps = {
	openNote: number;
};

export default function DroneString({ openNote }: DroneStringProps) {
	const frets = 6;

	return (
		<div className='DroneString ml-1 flex justify-evenly'>
			{rangeOfLength(5).map((i) => (
				<SkippedFret key={`drone-skipped-${i}`} />
			))}

			<Nut note={openNote} />

			{rangeOfLength(frets).map((i) => (
				<Fret note={(openNote + 1 + i) % 12} key={`drone-fret-${i}`} />
			))}
		</div>
	);
}
