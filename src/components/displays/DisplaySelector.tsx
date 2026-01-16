import { InstrumentIcon } from '@/components/icons';
import { useButtonHandler } from '@/hooks';
import type { IconName } from '@/types';
import { memo, useCallback } from 'react';

type DisplaySelectorProps = {
	icon: IconName;
	text: string;
	isActive: boolean;
	onFxn: (icon: IconName) => void;
};

function DisplaySelectorComponent({ icon, text, isActive, onFxn }: DisplaySelectorProps) {
	const { handleClick, handleKeyDown } = useButtonHandler(
		useCallback(() => {
			onFxn(icon);
		}, [onFxn, icon])
	);

	return (
		<button
			type='button'
			className={`DisplaySelector flex min-w-4 flex-col items-center justify-center rounded-lg grayscale transition-all sm:p-2 ${
				!isActive ? 'opacity-30 hover:opacity-50' : 'opacity-65 hover:opacity-100'
			}`}
			title={text}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<InstrumentIcon name={icon} />
			<span className='text-xs font-bold sm:text-sm'>{text}</span>
		</button>
	);
}

export const DisplaySelector = memo(DisplaySelectorComponent);
