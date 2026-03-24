import { InstrumentIcon } from '@/components';
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
			className={`DisplaySelector flex flex-col justify-center shrink-0 items-center rounded-lg grayscale w-24 min-w-4 transition-all sm:p-2 ${
				!isActive ? 'opacity-30 hover:opacity-50' : 'opacity-65 hover:opacity-100'
			}`}
			title={text}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<InstrumentIcon name={icon} />
			<span className='text-xs font-bold whitespace-nowrap'>{text}</span>
		</button>
	);
}

export const DisplaySelector = memo(DisplaySelectorComponent);
