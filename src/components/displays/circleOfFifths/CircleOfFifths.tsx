import { useGlobals, useScales } from '@/hooks';
import { memo } from 'react';
import {
	CircleOfFifthsEnharmonicNote,
	CircleOfFifthsVariantHub,
	CircleOfFifthsWheel,
	useCircleOfFifthsSegments,
} from '.';

function CircleOfFifthsComponent() {
	const { usingFlats } = useGlobals();
	const { handleTonicChange } = useScales();
	const segments = useCircleOfFifthsSegments();

	return (
		<div className='CircleOfFifths flex flex-col gap-3 items-center w-full'>
			<CircleOfFifthsWheel segments={segments} onTonicSelect={handleTonicChange}>
				<CircleOfFifthsVariantHub />
			</CircleOfFifthsWheel>
			<CircleOfFifthsEnharmonicNote usingFlats={usingFlats} />
		</div>
	);
}

export const CircleOfFifths = memo(CircleOfFifthsComponent);
