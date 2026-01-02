import { useGlobals } from '@/hooks';
import type { NoteIndex } from '@/types';
import { getNote, isValidNoteIndex, rangeOfLength } from '@/utils';
import type { ChangeEvent } from 'react';

type TonicProps = {
	tonic: NoteIndex;
	handleTonicChange: (value: NoteIndex) => void;
};

export default function Tonic({ tonic, handleTonicChange }: TonicProps) {
	const { usingFlats } = useGlobals();

	const note = getNote(tonic, usingFlats);
	const hasFlat = note.includes('♭');
	const hasSharp = note.includes('♯');

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = Number.parseInt(e.target.value, 10);
		if (isValidNoteIndex(value)) {
			handleTonicChange(value);
		}
	};

	return (
		<select
			className={`Tonic rounded-none border border-slate-500 min-w-14 min-h-12 px-1 hover:ring-1${hasFlat ? ' hasFlat' : ''}${hasSharp ? ' hasSharp' : ''}`}
			value={tonic}
			name='Tonic Select'
			onChange={handleChange}
		>
			{rangeOfLength(12).map((index) => {
				if (isValidNoteIndex(index)) {
					const tonicOption = getNote(index, usingFlats);
					return (
						<option value={index} key={tonicOption}>
							{tonicOption}
						</option>
					);
				}
				return null;
			})}
		</select>
	);
}
