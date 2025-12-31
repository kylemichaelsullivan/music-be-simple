import AllowedNote from '@/components/notes/AllowedNote';
import { useGlobals, useScales } from '@/hooks';

type KeyProps = {
	isBlack: boolean;
	note: number;
	isAllowed: boolean;
};

export default function Key({ isBlack, note, isAllowed }: KeyProps) {
	const { getNote, playNote } = useGlobals();
	const { tonic } = useScales();

	return (
		<button
			type='button'
			className={`Key border border-black ${isBlack ? 'black' : 'white'}`}
			title={getNote(note)}
			onClick={() => playNote(note)}
		>
			{isAllowed && <AllowedNote note={getNote(note)} isTonic={note === tonic} isPiano={true} />}
		</button>
	);
}
