import { useGlobals } from '@/hooks';
import type { XPositionType } from '@/types';
import { TopButton } from './TopButton';

type UseFlatsButtonProps = {
	position?: XPositionType;
};

export function UseFlatsButton({ position = 'right' }: UseFlatsButtonProps) {
	const { usingFlats, toggleUsingFlats } = useGlobals();

	return (
		<TopButton
			icon={usingFlats ? '♭' : '♯'}
			position={position}
			title={usingFlats ? 'Use Sharps?' : 'Use Flats?'}
			onFxn={toggleUsingFlats}
		/>
	);
}
