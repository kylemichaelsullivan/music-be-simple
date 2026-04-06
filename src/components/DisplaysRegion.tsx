import type { DisplaysProps } from '@/types';
import { Displays } from './displays';

type DisplaysRegionProps = {
	displaysProps: DisplaysProps;
};

export function DisplaysRegion({ displaysProps }: DisplaysRegionProps) {
	const { hideModesAndCircle, ...displaysPassthrough } = displaysProps;

	return (
		<div className='DisplaysRegion @container min-w-0 flex-1'>
			<Displays {...displaysPassthrough} hideModesAndCircle={hideModesAndCircle} />
		</div>
	);
}
