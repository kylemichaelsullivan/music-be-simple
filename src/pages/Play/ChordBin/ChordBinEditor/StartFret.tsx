import { ActionIcon } from '@/components/icons/ActionIcon';
import type { YDirectionType } from '@/types';
import { useState } from 'react';
import type { MouseEvent } from 'react';

export function StartFret() {
	const [startFret, setStartFret] = useState(0);
	const adjustStartFret = (
		e: MouseEvent<HTMLButtonElement>,
		fret: number,
		direction: YDirectionType
	) => {
		e.preventDefault();
		if (direction === 'down') {
			fret > 0 ? setStartFret(fret - 1) : setStartFret(0);
		} else if (direction === 'up') {
			fret < 11 ? setStartFret(fret + 1) : setStartFret(11);
		}
	};

	return (
		<div className='StartFret flex items-center justify-center gap-2'>
			<button type='button' onClick={(e) => adjustStartFret(e, startFret, 'down')}>
				<ActionIcon name='down' />
			</button>
			<span>{startFret}</span>
			<button type='button' onClick={(e) => adjustStartFret(e, startFret, 'up')}>
				<ActionIcon name='up' />
			</button>
		</div>
	);
}
