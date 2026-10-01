import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useButtonHandler, useGlobals } from '@/hooks';
import type { NoteIndex } from '@/types';
import type { ChordLookupMatch } from '@/utils';
import { formatChordLookupName, getChordLookupVoicingNotes, getNote } from '@/utils';

type ChordLookupResultProps = {
	match: ChordLookupMatch;
	isCurrent: boolean;
	onSelect: (match: ChordLookupMatch) => void;
};

function ChordLookupResultComponent({ match, isCurrent, onSelect }: ChordLookupResultProps) {
	const { usingFlats } = useGlobals();

	const displayName = useMemo(() => formatChordLookupName(match, usingFlats), [match, usingFlats]);

	const voicingNotes = useMemo(() => getChordLookupVoicingNotes(match), [match]);

	const handleSelect = useCallback(() => {
		onSelect(match);
	}, [match, onSelect]);

	const { handleClick, handleKeyDown } = useButtonHandler(handleSelect);

	return (
		<button
			type='button'
			className={clsx(
				'ChordLookupResult grid w-full grid-cols-[minmax(4rem,auto)_1fr] items-center gap-2 border-b border-slate-400 px-2 py-1 text-left text-sm hover:bg-slate-300',
				isCurrent ? 'bg-slate-400 font-semibold' : 'bg-slate-200'
			)}
			title={`Apply ${displayName}`}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-current={isCurrent ? 'true' : undefined}
		>
			<span className='ChordLookupResult-name font-medium'>{displayName}</span>
			<span className='ChordLookupResult-notes flex flex-wrap gap-1 text-xs'>
				{voicingNotes.map((note: NoteIndex) => {
					const noteText = getNote(note, usingFlats);
					return (
						<span
							className={clsx(
								noteText.includes('♭') && 'hasFlat',
								noteText.includes('♯') && 'hasSharp'
							)}
							key={`${match.tonic}-${match.variant}-${match.bass}-${note}`}
						>
							{noteText}
						</span>
					);
				})}
			</span>
		</button>
	);
}

export const ChordLookupResult = memo(ChordLookupResultComponent);
