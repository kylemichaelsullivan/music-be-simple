import AllowedNote from '@/components/notes/AllowedNote';
import { useGlobals, useInstrumentNotes } from '@/hooks';

type NutProps = {
	note: number;
};

export default function Nut({ note }: NutProps) {
	const { getNote, playNote } = useGlobals();
	const { notes, tonic, getBorderStyle } = useInstrumentNotes();

	const borderStyle = getBorderStyle ? getBorderStyle(note) : 'none';

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
			{notes.includes(note) && (
				<AllowedNote note={getNote(note)} isTonic={note === tonic} borderStyle={borderStyle} />
			)}
		</button>
	);
}
