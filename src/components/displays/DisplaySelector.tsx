import { useButtonHandler } from '@/hooks/useButtonHandler';
import type { InstrumentType } from '@/types';
import { useCallback } from 'react';
import Icon from '../Icon';

type DisplaySelectorProps = {
	icon: InstrumentType | 'Modes';
	text: string;
	isActive: boolean;
	onFxn: (icon: InstrumentType | 'Modes') => void;
};

function DisplaySelector({ icon, text, isActive, onFxn }: DisplaySelectorProps) {
	const { handleClick, handleKeyDown } = useButtonHandler(
		useCallback(() => {
			onFxn(icon);
		}, [onFxn, icon])
	);

	return (
		<button
			type='button'
			className={`DisplaySelector flex min-w-4 flex-col items-center justify-center rounded-lg grayscale transition-all sm:p-2 ${
				!isActive ? 'opacity-30 hover:opacity-50' : 'opacity-100 hover:opacity-65'
			}`}
			title={text}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<Icon name={icon} />
			<span className='text-xs font-bold sm:text-sm'>{text}</span>
		</button>
	);
}

export default DisplaySelector;
