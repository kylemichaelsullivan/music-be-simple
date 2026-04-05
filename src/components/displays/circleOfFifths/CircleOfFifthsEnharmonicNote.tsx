import { useScales } from '@/hooks';
import { memo, useMemo } from 'react';
import { circleOfFifthsEnharmonicHintText } from './circleOfFifthsEnharmonicHint';

type CircleOfFifthsEnharmonicNoteProps = {
	usingFlats: boolean;
};

function CircleOfFifthsEnharmonicNoteComponent({ usingFlats }: CircleOfFifthsEnharmonicNoteProps) {
	const { variant } = useScales();
	const text = useMemo(() => circleOfFifthsEnharmonicHintText(usingFlats, variant), [usingFlats, variant]);

	return (
		<p
			className='CircleOfFifthsEnharmonicNote text-slate-600 text-sm leading-snug text-center px-3 max-w-[min(95cqw,95vh)] min-w-0'
			role='note'
		>
			{text}
		</p>
	);
}

export const CircleOfFifthsEnharmonicNote = memo(CircleOfFifthsEnharmonicNoteComponent);
