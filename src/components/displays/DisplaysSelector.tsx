import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { IconType } from '@/types';
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
	return (
		<div className='DisplaysSelector relative border border-slate-500'>
			<div className='flex gap-8 justify-center px-4 py-1 overflow-x-auto'>
				{INSTRUMENT_ORDER.map((iconName) => {
					const iconType = ICON_MAP[iconName];
					return (
						<DisplaySelector
							icon={iconName}
							text={iconName}
							isActive={displays.includes(iconType)}
							onFxn={() => onFxn(iconType)}
							key={iconName}
						/>
					);
				})}

				{hasModes && (
					<DisplaySelector
						icon='Modes'
						text='Modes'
						isActive={displays.includes('stand')}
						onFxn={() => onFxn('stand')}
						key='Modes'
					/>
				)}
			</div>
		</div>
	);
}
