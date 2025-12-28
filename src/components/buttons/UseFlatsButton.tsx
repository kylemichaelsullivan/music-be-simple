import TopButton from '@/components/buttons/TopButton';
import { useGlobals } from '@/hooks/useGlobals';
import type { XPositionType } from '@/types';

type UseFlatsButtonProps = {
	position?: XPositionType;
};

export default function UseFlatsButton({ position = 'right' }: UseFlatsButtonProps) {
	const { usingFlats, toggleUsingFlats } = useGlobals();

	return (
		<TopButton
			title={usingFlats ? 'Use Sharps?' : 'Use Flats?'}
			icon={usingFlats ? '♭' : '♯'}
			position={position}
			onFxn={toggleUsingFlats}
		/>
	);
}
