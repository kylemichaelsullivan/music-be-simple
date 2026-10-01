import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { useButtonHandler } from '@/hooks';
import { NoteIndexSchema } from '@/schemas';
import type { NoteIndex } from '@/types';
import { getNote, isValidNoteIndex } from '@/utils';

type ChordLookupPitchButtonProps = {
	note: NoteIndex;
	isSelected: boolean;
	usingFlats: boolean;
	onToggle: (note: NoteIndex) => void;
};

function isBlackKey(note: NoteIndex): boolean {
	return note === 1 || note === 3 || note === 6 || note === 8 || note === 10;
}

function ChordLookupPitchButtonComponent({
	note,
	isSelected,
	usingFlats,
	onToggle,
}: ChordLookupPitchButtonProps) {
	const noteText = getNote(note, usingFlats);
	const isBlack = isBlackKey(note);

	const handleToggle = useCallback(() => {
		const result = NoteIndexSchema.safeParse(note);
		if (result.success && isValidNoteIndex(result.data)) {
			onToggle(result.data);
		}
	}, [note, onToggle]);

	const { handleClick, handleKeyDown } = useButtonHandler(handleToggle);

	return (
		<button
			type='button'
			className={clsx(
				'ChordLookupPitchButton',
				isBlack ? 'black' : 'white',
				isSelected && 'is-selected'
			)}
			title={noteText}
			aria-label={noteText}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-pressed={isSelected}
		>
			<span className='ChordLookupPitchButton-label' aria-hidden='true'>
				{noteText}
			</span>
		</button>
	);
}

export const ChordLookupPitchButton = memo(ChordLookupPitchButtonComponent);
