import { useInstrumentNotes } from '@/hooks';
import type { border } from '@/types';
import { getBorderClass } from '@/utils';
import clsx from 'clsx';

type AllowedNoteProps = {
	note: string;
	isTonic: boolean;
	borderStyle: border;
	isPiano?: boolean;
};

export function AllowedNote({ note, isTonic, borderStyle, isPiano = false }: AllowedNoteProps) {
	const { showNoteLabels = true } = useInstrumentNotes();
	const bgColor = isTonic ? 'bg-green-800' : 'bg-green-600';
	const fontSize = isTonic ? 'text-xxs' : 'text-xxxs';
	const hasFlat = note.includes('♭');
	const hasSharp = note.includes('♯');
	const verticalPosition = isPiano ? 'bottom-1' : 'bottom-1/2 translate-y-1/2';

	return (
		<span
			className={clsx(
				'AllowedNote absolute flex items-center justify-center rounded-full ring-1 ring-slate-300 text-white w-4 h-4 text-center font-bold leading-none left-1/2 translate-x-[-50%] sm:w-6 sm:h-6',
				bgColor,
				fontSize,
				verticalPosition,
				getBorderClass(borderStyle, 'all'),
				hasFlat && 'hasFlat',
				hasSharp && 'hasSharp'
			)}
			title={note}
		>
			{showNoteLabels ? note : ''}
		</span>
	);
}
