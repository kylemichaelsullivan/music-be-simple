import { useChords, useGlobals } from '@/hooks';
import type { NoteIndex } from '@/types';
import { getBorderClass, getNote } from '@/utils';
import clsx from 'clsx';
import { memo } from 'react';

type ChordNoteProps = {
	note: NoteIndex;
};

const ChordNote = memo(function ChordNote({ note }: ChordNoteProps) {
	const { usingFlats } = useGlobals();
	const { getBorderStyle } = useChords();
	const noteText = getNote(note, usingFlats);
	const hasFlat = noteText.includes('♭');
	const hasSharp = noteText.includes('♯');
	const borderStyle = getBorderStyle(note);

	return (
		<div
			className={clsx(
				'ChordNote text-lg font-medium text-center',
				hasFlat && 'hasFlat',
				hasSharp && 'hasSharp',
				getBorderClass(borderStyle, 'bottom')
			)}
		>
			{noteText}
		</div>
	);
});

export default ChordNote;
