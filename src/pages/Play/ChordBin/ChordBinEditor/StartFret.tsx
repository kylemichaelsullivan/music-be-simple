import { ActionIcon } from '@/components/icons/ActionIcon';
import { useButtonHandler } from '@/hooks';
import type { YDirectionType } from '@/types';
import { useCallback, useState } from 'react';

export function StartFret() {
	const [startFret, setStartFret] = useState(0);

	const adjustStartFret = useCallback((fret: number, direction: YDirectionType) => {
		if (direction === 'down') {
			fret > 0 ? setStartFret(fret - 1) : setStartFret(0);
		} else if (direction === 'up') {
			fret < 11 ? setStartFret(fret + 1) : setStartFret(11);
		}
	}, []);

	const handleDown = useCallback(
		() => adjustStartFret(startFret, 'down'),
		[startFret, adjustStartFret]
	);
	const handleUp = useCallback(
		() => adjustStartFret(startFret, 'up'),
		[startFret, adjustStartFret]
	);

	const { handleClick: handleDownClick, handleKeyDown: handleDownKeyDown } =
		useButtonHandler(handleDown);
	const { handleClick: handleUpClick, handleKeyDown: handleUpKeyDown } = useButtonHandler(handleUp);

	return (
		<div className='StartFret flex items-center justify-center gap-2'>
			<button type='button' onClick={handleDownClick} onKeyDown={handleDownKeyDown}>
				<ActionIcon name='down' />
			</button>

			<span>{startFret}</span>

			<button type='button' onClick={handleUpClick} onKeyDown={handleUpKeyDown}>
				<ActionIcon name='up' />
			</button>
		</div>
	);
}
