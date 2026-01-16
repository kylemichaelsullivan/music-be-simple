import { AllowedNote } from '@/components/AllowedNote';
import { useButtonHandler, useGlobals, useInstrumentNotes } from '@/hooks';
import type { NoteIndex } from '@/types';
import { getNote } from '@/utils';
import clsx from 'clsx';

type KeyProps = {
	note: NoteIndex;
	isBlack: boolean;
	isAllowed: boolean;
};

export function Key({ note, isBlack, isAllowed }: KeyProps) {
	const { usingFlats, playNote } = useGlobals();
	const { tonic, getBorderStyle } = useInstrumentNotes();
	const noteName = getNote(note, usingFlats);
	const { handleClick, handleKeyDown } = useButtonHandler(() => playNote(note));

	const borderStyle = getBorderStyle ? getBorderStyle(note) : 'none';

	return (
		<button
			type='button'
			className={clsx(
				'Key border border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
				isBlack ? 'black' : 'white'
			)}
			title={noteName}
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
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
