import { useGlobals } from '@/hooks';
import type { PositionType } from '@/types';
import { DisplaysSelectorMoveButton } from './DisplaysSelectorMoveButton';

export function DisplaysSelectorMove() {
	const { displaysSelectorPosition, handleDisplaysSelectorMove } = useGlobals();

	const directions: PositionType[] = ['top', 'right', 'bottom', 'left'];

	return (
		<div className='DisplaysSelectorMove hidden shrink-0 justify-center items-center border border-slate-500 md:flex'>
			<fieldset className='grid grid-cols-3 grid-rows-3 gap-1 place-items-center p-1 m-0 border-0 min-w-0'>
				<legend className='sr-only'>Move display</legend>
				{directions.map((direction) => (
					<DisplaysSelectorMoveButton
						direction={direction}
						onFxn={() => handleDisplaysSelectorMove(direction)}
						disabled={direction === displaysSelectorPosition}
						key={direction}
					/>
				))}
			</fieldset>
		</div>
	);
}
