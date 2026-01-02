import AllowedNote from '@/components/notes/AllowedNote';
import { useGlobals, useInstrumentNotes } from '@/hooks';

type FretProps = {
	note: number;
};

export default function Fret({ note }: FretProps) {
	const { notes, tonic, getBorderStyle } = useInstrumentNotes();
	const { getNote, playNote } = useGlobals();

	const borderStyle = getBorderStyle ? getBorderStyle(note) : 'none';

	return (
		<button
			type='button'
			className='Fret w-full border-r border-black'
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
