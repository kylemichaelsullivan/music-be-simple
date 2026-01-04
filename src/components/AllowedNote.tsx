import { useInstrumentNotes } from '@/hooks';
import type { border } from '@/types';
import { getBorderClass } from '@/utils';

type AllowedNoteProps = {
	note: string;
	isTonic: boolean;
	borderStyle: border;
	isPiano?: boolean;
};

export default function AllowedNote({
	note,
	isTonic,
	borderStyle,
	isPiano = false,
}: AllowedNoteProps) {
	const { showNoteLabels = true } = useInstrumentNotes();
	const bgColor = isTonic ? 'bg-green-800' : 'bg-green-600';
	const fontSize = isTonic ? 'text-xxs' : 'text-xxxs';
	const hasFlat = note.includes('♭');
	const hasSharp = note.includes('♯');
	const verticalPosition = isPiano ? 'bottom-1' : 'bottom-1/2 translate-y-1/2';

	return (
		<span
			className={`AllowedNote absolute flex items-center justify-center ${bgColor} rounded-full ring-1 ring-slate-300 text-white ${fontSize} w-4 h-4 text-center font-bold leading-none ${verticalPosition} left-1/2 translate-x-[-50%] ${getBorderClass(borderStyle, 'all')}${hasFlat ? ' hasFlat' : ''}${hasSharp ? ' hasSharp' : ''} sm:w-6 sm:h-6`}
			title={note}
		>
			{showNoteLabels ? note : ''}
		</span>
	);
}
