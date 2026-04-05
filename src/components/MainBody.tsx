import { useGlobals } from '@/hooks';
import type { MainBodyProps } from '@/types';
import { SkipLink } from './SkipLink';
import { Displays, DisplaysSelector } from './displays';

export function MainBody({ displaysProps, afterDisplaysSlot }: MainBodyProps) {
	const { displays, handleDisplaysClick } = useGlobals();
	const { hideModesAndCircle, ...displaysPassthrough } = displaysProps;

	return (
		<>
			<SkipLink text='Skip displays selector' targetSelector='.Displays' />
			<div className='MainBody flex flex-col gap-4 md:flex-row'>
				<DisplaysSelector
					hideModesAndCircle={hideModesAndCircle}
					displays={displays}
					onFxn={handleDisplaysClick}
				/>
				<div className='DisplaysRegion @container min-w-0 flex-1'>
					<Displays {...displaysPassthrough} hideModesAndCircle={hideModesAndCircle} />
				</div>

				{afterDisplaysSlot}
			</div>
		</>
	);
}
