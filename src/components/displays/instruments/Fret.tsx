import { AllowedNote } from '@/components/AllowedNote';
import { useButtonHandler, useGlobals, useInstrumentNotes } from '@/hooks';
import type { NoteIndex } from '@/types';
import { getNote } from '@/utils';

type FretProps = {
	note: NoteIndex;
};

export function Fret({ note }: FretProps) {
	const { usingFlats, playNote } = useGlobals();
	const { notes, tonic, getBorderStyle } = useInstrumentNotes();
	const noteName = getNote(note, usingFlats);
	const { handleClick, handleKeyDown } = useButtonHandler(() => playNote(note));

	const borderStyle = getBorderStyle ? getBorderStyle(note) : 'none';

	return (
		<button
			type='button'
			className='Fret w-full border-r border-black'
			title={noteName}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			{notes.includes(note) && (
				<AllowedNote note={noteName} isTonic={note === tonic} borderStyle={borderStyle} />
			)}
		</button>
	);
}
