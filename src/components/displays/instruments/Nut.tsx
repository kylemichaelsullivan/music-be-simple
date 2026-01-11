import { AllowedNote } from '@/components/AllowedNote';
import { useGlobals, useInstrumentNotes } from '@/hooks';
import type { NoteIndex } from '@/types';
import { getNote } from '@/utils';

type NutProps = {
	note: NoteIndex;
};

export function Nut({ note }: NutProps) {
	const { usingFlats, playNote } = useGlobals();
	const { notes, tonic, getBorderStyle } = useInstrumentNotes();
	const noteName = getNote(note, usingFlats);

	const borderStyle = getBorderStyle ? getBorderStyle(note) : 'none';

	return (
		<button
			type='button'
			className='Nut w-8 bg-black'
			title={noteName}
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
				<AllowedNote note={noteName} isTonic={note === tonic} borderStyle={borderStyle} />
			)}
		</button>
	);
}
