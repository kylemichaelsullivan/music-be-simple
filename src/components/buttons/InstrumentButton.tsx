import { InstrumentIcon } from '@/components/icons';
import { useButtonHandler } from '@/hooks';
import type { InstrumentType } from '@/types';
import { useCallback } from 'react';

type InstrumentButtonProps = {
	instrument: InstrumentType;
	isActive: boolean;
	onClick: (instrument: InstrumentType) => void;
};

export function InstrumentButton({ instrument, isActive, onClick }: InstrumentButtonProps) {
	const { handleClick, handleKeyDown } = useButtonHandler(
		useCallback(() => {
			onClick(instrument);
		}, [instrument, onClick])
	);

	return (
		<button
			type='button'
			className={`flex min-w-4 flex-col items-center justify-center rounded-lg grayscale transition-all p-2 ${
				!isActive ? 'opacity-30 hover:opacity-50' : 'opacity-65 hover:opacity-100'
			}`}
			title={instrument}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<InstrumentIcon name={instrument} size='sm' />
			<span className='text-xs font-bold'>{instrument}</span>
		</button>
	);
}
