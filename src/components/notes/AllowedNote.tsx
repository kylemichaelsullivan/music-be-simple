import { useScales } from '@/hooks';

type AllowedNoteProps = {
	note: string;
	isTonic: boolean;
	isPiano?: boolean;
};

export default function AllowedNote({ note, isTonic, isPiano = false }: AllowedNoteProps) {
	const { showNoteLabels } = useScales();
	const bgColor = isTonic ? 'bg-green-800' : 'bg-green-600';
	const fontSize = isTonic ? 'text-xxs' : 'text-xxxs';
	const hasFlat = note.includes('♭');
	const hasSharp = note.includes('♯');
	const verticalPosition = isPiano ? 'bottom-1' : 'bottom-1/2 translate-y-1/2';

	return (
		<span
			className={`AllowedNote absolute flex items-center justify-center ${bgColor} rounded-full text-white ${fontSize} h-4 w-4 text-center font-bold leading-none ${verticalPosition} left-1/2 translate-x-[-50%] ${hasFlat ? 'hasFlat' : ''} ${hasSharp ? 'hasSharp' : ''}`}
			title={note}
		>
			{showNoteLabels ? note : ''}
		</span>
	);
}
