import clsx from 'clsx';
import { useGlobals } from '@/hooks';
import type { MainBodyProps, PositionType } from '@/types';
import { DisplaysRegion } from './DisplaysRegion';
import { DisplaysSelectorContainer } from './displays';
import { SkipLink } from './SkipLink';

const MAIN_BODY_MD_FLEX: Record<PositionType, string> = {
	left: 'md:flex-row',
	right: 'md:flex-row-reverse',
	top: 'md:flex-col',
	bottom: 'md:flex-col-reverse',
};

export function MainBody({ displaysProps, afterDisplaysSlot }: MainBodyProps) {
	const { displays, handleDisplaysClick, displaysSelectorPosition } = useGlobals();
	const { hideModesAndCircle } = displaysProps;

	return (
		<>
			<SkipLink text='Skip displays selector' targetSelector='.Displays' />
			<div
				className={clsx(
					'MainBody flex flex-col gap-4',
					MAIN_BODY_MD_FLEX[displaysSelectorPosition]
				)}
			>
				<DisplaysSelectorContainer
					displays={displays}
					hideModesAndCircle={hideModesAndCircle}
					onFxn={handleDisplaysClick}
				/>

				<DisplaysRegion displaysProps={displaysProps} />

				{afterDisplaysSlot}
			</div>
		</>
	);
}
