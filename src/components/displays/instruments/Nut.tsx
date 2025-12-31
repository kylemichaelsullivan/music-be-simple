import { useGlobals, useScales } from '@/hooks';

import AllowedNote from '@/components/notes/AllowedNote';

type NutProps = {
	note: number;
};

export default function Nut({ note }: NutProps) {
	const { notes, tonic } = useScales();
	const { getNote, playNote } = useGlobals();

	return (
		<button
			type='button'
			className='Nut w-8 bg-black'
			title={getNote(note)}
			onClick={() => playNote(note)}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					playNote(note);
				}
			}}
			tabIndex={0}
		>
			{notes.includes(note) && <AllowedNote note={getNote(note)} isTonic={note === tonic} />}
		</button>
	);
}
