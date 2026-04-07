import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useGlobals } from '@/hooks';
import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { DisplaysSelectorProps } from '@/types';
import { DisplaySelector } from './DisplaySelector';

export function DisplaysSelector({
	displays = [],
	hideModesAndCircle,
	onFxn,
}: DisplaysSelectorProps) {
	const { displaysSelectorPosition } = useGlobals();
	const isTopOrBottom = displaysSelectorPosition === 'top' || displaysSelectorPosition === 'bottom';
	const instrumentSelectors = useMemo(
		() =>
			INSTRUMENT_ORDER.map((iconName) => {
				const iconType = ICON_MAP[iconName];
				const handleClick = () => onFxn(iconType);

				return (
					<DisplaySelector
						icon={iconName}
						text={iconName}
						isActive={displays.includes(iconType)}
						onFxn={handleClick}
						key={iconName}
					/>
				);
			}),
		[displays, onFxn]
	);

	const handleModesClick = useCallback(() => {
		onFxn('stand');
	}, [onFxn]);

	const handleCircleOfFifthsClick = useCallback(() => {
		onFxn('circle');
	}, [onFxn]);

	return (
		<div
			className={clsx(
				'DisplaysSelector border border-slate-500 w-full min-w-0 px-4 py-1 overflow-x-auto',
				isTopOrBottom
					? 'md:flex-1 md:min-w-0 md:overflow-x-auto'
					: 'md:overflow-x-visible md:overflow-y-auto md:min-h-0 md:max-h-full'
			)}
		>
			<div
				className={clsx(
					'flex flex-row flex-nowrap items-center justify-center gap-8 w-max mx-auto',
					!isTopOrBottom && 'md:flex-col'
				)}
			>
				{instrumentSelectors}

				{!hideModesAndCircle && (
					<>
						<DisplaySelector
							icon='Modes'
							text='Modes'
							isActive={displays.includes('stand')}
							onFxn={handleModesClick}
							key='Modes'
						/>

						<DisplaySelector
							icon='Circle'
							text='Circle'
							isActive={displays.includes('circle')}
							onFxn={handleCircleOfFifthsClick}
							key='CircleOfFifths'
						/>
					</>
				)}
			</div>
		</div>
	);
}
