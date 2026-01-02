import AllowedNote from '@/components/notes/AllowedNote';
import { useGlobals, useInstrumentNotes } from '@/hooks';
import type { KeyboardEvent } from 'react';

type KeyProps = {
	isBlack: boolean;
	note: number;
	isAllowed: boolean;
};

export default function Key({ isBlack, note, isAllowed }: KeyProps) {
	const { getNote, playNote } = useGlobals();
	const { tonic, getBorderStyle } = useInstrumentNotes();

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
			title={getNote(note)}
			onClick={() => playNote(note)}
			onKeyDown={(e) => handleKeyDown(e)}
		>
			{isAllowed && (
				<AllowedNote
					note={getNote(note)}
					isTonic={note === tonic}
					borderStyle={borderStyle}
					isPiano={true}
				/>
			)}
		</button>
	);
}
