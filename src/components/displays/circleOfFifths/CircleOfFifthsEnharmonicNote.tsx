import { memo, useMemo } from 'react';
import { circleOfFifthsEnharmonicHintText } from './circleOfFifthsEnharmonicHint';

type CircleOfFifthsEnharmonicNoteProps = {
	usingFlats: boolean;
};

function CircleOfFifthsEnharmonicNoteComponent({ usingFlats }: CircleOfFifthsEnharmonicNoteProps) {
	const text = useMemo(() => circleOfFifthsEnharmonicHintText(usingFlats), [usingFlats]);

	return (
		<p
			className='CircleOfFifthsEnharmonicNote text-slate-600 text-sm leading-snug text-center max-w-[min(95vw,95vh)] px-3'
			role='note'
		>
			{text}
		</p>
	);
}

export const CircleOfFifthsEnharmonicNote = memo(CircleOfFifthsEnharmonicNoteComponent);
