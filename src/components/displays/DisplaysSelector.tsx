import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { IconType } from '@/types';
import { useCallback, useMemo } from 'react';
import { DisplaySelector } from './';

type DisplaysSelectorProps = {
	hasModes?: boolean;
	displays?: IconType[];
	onFxn: (icon: IconType) => void;
};

export function DisplaysSelector({
	onFxn,
	hasModes = false,
	displays = [],
}: DisplaysSelectorProps) {
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

	return (
		<div className='DisplaysSelector relative border border-slate-500'>
			<div className='flex gap-8 justify-center px-4 py-1 overflow-x-auto'>
				{instrumentSelectors}

				{hasModes && (
					<DisplaySelector
						icon='Modes'
						text='Modes'
						isActive={displays.includes('stand')}
						onFxn={handleModesClick}
						key='Modes'
					/>
				)}
			</div>
		</div>
	);
}
