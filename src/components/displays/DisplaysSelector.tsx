import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { DisplaysSelectorProps } from '@/types';
import { useCallback, useMemo } from 'react';
import { DisplaySelector } from '.';

export function DisplaysSelector({ hideModesAndCircle, onFxn, displays = [] }: DisplaysSelectorProps) {
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
		<div className='DisplaysSelector relative border border-slate-500 min-w-0 max-h-fit'>
			<div className='flex flex-row md:flex-col gap-8 justify-start md:justify-center md:items-center px-4 py-1 overflow-x-auto md:overflow-x-visible'>
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
