import clsx from 'clsx';
import { useGlobals } from '@/hooks';
import type { DisplaysSelectorProps } from '@/types';
import { DisplaysSelector } from './DisplaysSelector';
import { DisplaysSelectorMove } from './DisplaysSelectorMove';

export function DisplaysSelectorContainer({
	hideModesAndCircle,
	showTriads,
	onFxn,
	displays = [],
}: DisplaysSelectorProps) {
	const { displaysSelectorPosition } = useGlobals();
	const isTopOrBottom = displaysSelectorPosition === 'top' || displaysSelectorPosition === 'bottom';

	return (
		<div
			className={clsx(
				'DisplaysSelectorContainer relative flex flex-col gap-4 min-w-0 max-h-fit',
				isTopOrBottom && 'md:flex-row md:items-center'
			)}
		>
			<DisplaysSelector
				displays={displays}
				hideModesAndCircle={hideModesAndCircle}
				showTriads={showTriads}
				onFxn={onFxn}
			/>

			<DisplaysSelectorMove />
		</div>
	);
}
