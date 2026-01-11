import { ActionIcon } from '@/components/icons';
import { useButtonHandler, useScales } from '@/hooks';
import { isValidNoteIndex } from '@/utils';

type TransposeButtonProps = {
	direction: 'up' | 'down';
};

export function TransposeButton({ direction }: TransposeButtonProps) {
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
	const title = isUp ? 'Up a Fifth' : 'Down a Fifth';
	const componentName = isUp ? 'TransposeUp' : 'TransposeDown';
	const transposeDirectionFunction = isUp ? transposeUp : transposeDown;
	const { handleClick, handleKeyDown } = useButtonHandler(transposeDirectionFunction);

	return (
		<button
			type='button'
			className={`${componentName} bg-slate-200 border border-slate-500 p-2 hover:ring-1`}
			title={title}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<ActionIcon name={direction} size='sm' />
		</button>
	);
}
