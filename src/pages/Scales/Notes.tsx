import { useGlobals, useScales } from '@/hooks';
import { INTERVALS } from '@/utils/notes';
import { useEffect, useState } from 'react';

export default function Notes() {
	const { variant, notes } = useScales();
	const { getNote } = useGlobals();

	const [noteCount, setNoteCount] = useState<number>(INTERVALS[variant].length + 1);

	useEffect(() => {
		setNoteCount(INTERVALS[variant].length + 1);
	}, [variant]);

	const getGridClass = (count: number) => {
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
				return 'grid-cols-7'; // fallback
		}
	};

	const gridClass = getGridClass(noteCount);

	return (
		<div className='Notes border border-slate-500 bg-slate-200 text-center shadow-md'>
			<div className={`grid ${gridClass}`}>
				{Array.from({ length: noteCount }, (_, index) => (
					<div key={`note-count-${index + 1}`}>{index + 1}</div>
				))}
			</div>

			<div className={`grid ${gridClass}`}>
				{notes.map((note: number) => (
					<div key={`note-${note}`}>{getNote(note)}</div>
				))}
			</div>
		</div>
	);
}
