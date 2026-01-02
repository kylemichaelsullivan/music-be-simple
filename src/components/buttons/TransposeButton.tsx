import { useScales } from '@/hooks';
import { isValidNoteIndex } from '@/utils';
import downIcon from '/icons/down.svg';
import upIcon from '/icons/up.svg';

type TransposeButtonProps = {
	direction: 'up' | 'down';
};

export default function TransposeButton({ direction }: TransposeButtonProps) {
	const { tonic, handleTonicChange } = useScales();

	function transposeUp() {
		const transposed = (tonic + 7 + 12) % 12;
		if (isValidNoteIndex(transposed)) {
			handleTonicChange(transposed);
		}
	}

	function transposeDown() {
		const transposed = (tonic - 7 + 12) % 12;
		if (isValidNoteIndex(transposed)) {
			handleTonicChange(transposed);
		}
	}

	const isUp = direction === 'up';
	const icon = isUp ? upIcon : downIcon;
	const title = isUp ? 'Up a Fifth' : 'Down a Fifth';
	const componentName = isUp ? 'TransposeUp' : 'TransposeDown';
	const onClick = isUp ? transposeUp : transposeDown;

	return (
		<button
			type='button'
			className={`${componentName} bg-slate-200 border border-slate-500 p-2 hover:ring-1`}
			title={title}
			onClick={onClick}
		>
			<img src={icon} className='w-4 h-4 sm:w-6 sm:h-6' alt={isUp ? 'Up' : 'Down'} />
		</button>
	);
}
