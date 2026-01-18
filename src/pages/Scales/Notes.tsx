import { useGlobals, useScales } from '@/hooks';
import type { NoteIndex } from '@/types';
import { INTERVALS, getNote, rangeOfLength } from '@/utils';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function Notes() {
	const { usingFlats } = useGlobals();
	const { variant, notes } = useScales();

	const [noteCount, setNoteCount] = useState<number>(INTERVALS[variant].length + 1);

	useEffect(() => {
		setNoteCount(INTERVALS[variant].length + 1);
	}, [variant]);

	const getGridClass = (count: number) => {
		// ensure Tailwind classes are compiled
		switch (count) {
			case 5:
				return 'grid-cols-5';
			case 6:
				return 'grid-cols-6';
			case 7:
				return 'grid-cols-7';
			case 8:
				return 'grid-cols-8';
			default:
				return 'grid-cols-7';
		}
	};

	const gridClass = getGridClass(noteCount);

	return (
		<div className='Notes flex flex-col gap-1 overflow-x-auto border border-slate-500 bg-slate-200 text-center min-w-0 shadow-md px-1 py-2'>
			<div className={`grid ${gridClass} min-w-0`}>
				{rangeOfLength(noteCount).map((index) => (
					<div key={`note-count-${index + 1}`}>{index + 1}</div>
				))}
			</div>

			<div className={`grid ${gridClass} min-w-0`}>
				{notes.map((note: NoteIndex) => {
					const noteText = getNote(note, usingFlats);
					const hasFlat = noteText.includes('♭');
					const hasSharp = noteText.includes('♯');
					return (
						<div
							className={clsx(hasFlat && 'hasFlat', hasSharp && 'hasSharp')}
							key={`note-${note}`}
						>
							{noteText}
						</div>
					);
				})}
			</div>
		</div>
	);
}
