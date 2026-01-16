import { AllowedNote } from '@/components/AllowedNote';
import { useButtonHandler, useGlobals, useInstrumentNotes } from '@/hooks';
import type { NoteIndex } from '@/types';
import { getNote } from '@/utils';

type NutProps = {
	note: NoteIndex;
};

export function Nut({ note }: NutProps) {
	const { usingFlats, playNote } = useGlobals();
	const { notes, tonic, getBorderStyle } = useInstrumentNotes();
	const noteName = getNote(note, usingFlats);
	const { handleClick, handleKeyDown } = useButtonHandler(() => playNote(note));

	const borderStyle = getBorderStyle ? getBorderStyle(note) : 'none';

	return (
		<button
			type='button'
			className='Nut w-8 bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
			title={noteName}
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{notes.includes(note) && (
				<AllowedNote note={noteName} isTonic={note === tonic} borderStyle={borderStyle} />
			)}
		</button>
	);
}
