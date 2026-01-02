import AllowedNote from '@/components/notes/AllowedNote';
import { useGlobals, useInstrumentNotes } from '@/hooks';
import type { NoteIndex } from '@/types';
import { getNote } from '@/utils';
import type { KeyboardEvent } from 'react';

type KeyProps = {
	note: NoteIndex;
	isBlack: boolean;
	isAllowed: boolean;
};

export default function Key({ note, isBlack, isAllowed }: KeyProps) {
	const { usingFlats, playNote } = useGlobals();
	const { tonic, getBorderStyle } = useInstrumentNotes();
	const noteName = getNote(note, usingFlats);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			playNote(note);
		}
	};

	const borderStyle = getBorderStyle ? getBorderStyle(note) : 'none';

	return (
		<button
			type='button'
			className={`Key border border-black ${isBlack ? 'black' : 'white'}`}
			title={noteName}
			onClick={() => playNote(note)}
			onKeyDown={(e) => handleKeyDown(e)}
		>
			{isAllowed && (
				<AllowedNote
					note={noteName}
					isTonic={note === tonic}
					borderStyle={borderStyle}
					isPiano={true}
				/>
			)}
		</button>
	);
}
