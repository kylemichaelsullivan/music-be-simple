import TopButton from '@/components/buttons/TopButton';
import { useGlobals } from '@/hooks';
import type { XPositionType } from '@/types';

type UseFlatsButtonProps = {
	position?: XPositionType;
};

export default function UseFlatsButton({ position = 'right' }: UseFlatsButtonProps) {
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
