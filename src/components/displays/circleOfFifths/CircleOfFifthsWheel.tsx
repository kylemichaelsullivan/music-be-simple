import type { ReactNode } from 'react';
import { memo } from 'react';
import type { NoteIndex } from '@/types';
import { CircleOfFifthsLabels } from './CircleOfFifthsLabels';
import { CircleOfFifthsRings } from './CircleOfFifthsRings';
import { CircleOfFifthsTonicWedges } from './CircleOfFifthsTonicWedges';
import type { CircleOfFifthsSegment } from './circleOfFifthsTypes';

type CircleOfFifthsWheelProps = {
	segments: CircleOfFifthsSegment[];
	onTonicSelect: (noteIndex: NoteIndex) => void;
	children?: ReactNode;
};

function CircleOfFifthsWheelComponent({
	segments,
	onTonicSelect,
	children,
}: CircleOfFifthsWheelProps) {
	return (
		<div className='CircleOfFifthsWheel relative aspect-square border border-slate-900/15 bg-slate-100/80 rounded-full shadow-sm w-[min(95cqw,95vh)] h-[min(95cqw,95vh)]'>
			<svg
				className='absolute text-slate-900 w-full h-full inset-0'
				role='img'
				viewBox='0 0 100 100'
			>
				<title>Circle of Fifths</title>

				<CircleOfFifthsRings segments={segments} />
				<CircleOfFifthsTonicWedges segments={segments} onTonicSelect={onTonicSelect} />
				<CircleOfFifthsLabels segments={segments} />
			</svg>
			<div className='absolute flex justify-center items-center pointer-events-none inset-0 z-10'>
				<div className='pointer-events-auto w-[32%] min-w-0 px-0.5'>{children}</div>
			</div>
		</div>
	);
}

export const CircleOfFifthsWheel = memo(CircleOfFifthsWheelComponent);
