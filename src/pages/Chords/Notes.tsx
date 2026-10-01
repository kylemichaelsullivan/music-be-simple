import { memo } from 'react';
import { useChords } from '@/hooks';
import { ChordName, ChordNotes } from '.';

const Notes = memo(function Notes() {
	const { chordName, notes } = useChords();

	return (
		<div className='Notes grid w-full min-w-0 grid-cols-8 gap-1 items-center border border-slate-500 bg-slate-200 text-center shadow-md p-2'>
			<ChordName chordName={chordName} />
			<ChordNotes notes={notes} />
		</div>
	);
});

export { Notes };
