import { memo } from 'react';
import {
	R_HUB,
	R_MAJOR_INNER,
	R_MID_INNER,
	R_OUTER,
	VIEW_CENTER,
	polar,
} from './circleOfFifthsGeometry';
import type { CircleOfFifthsSegment } from './circleOfFifthsTypes';

type CircleOfFifthsRingsProps = {
	segments: CircleOfFifthsSegment[];
};

function CircleOfFifthsRingsComponent({ segments }: CircleOfFifthsRingsProps) {
	return (
		<>
			<circle
				className='fill-none stroke-current stroke-[0.4] opacity-90'
				cx={VIEW_CENTER}
				cy={VIEW_CENTER}
				r={R_OUTER}
			/>

			<g className='pointer-events-none' aria-hidden>
				<circle
					className='fill-none stroke-current stroke-[0.25] opacity-70'
					cx={VIEW_CENTER}
					cy={VIEW_CENTER}
					r={R_MAJOR_INNER}
				/>
				<circle
					className='fill-none stroke-current stroke-[0.25] opacity-70'
					cx={VIEW_CENTER}
					cy={VIEW_CENTER}
					r={R_MID_INNER}
				/>
				{segments.map((s, i) => {
					const prevIndex = (i + segments.length - 1) % segments.length;
					const prevSegment = segments[prevIndex];
					const isTonicBoundary = !!(s.isCurrentTonic || prevSegment?.isCurrentTonic);
					const scaleClass = s.inSelectedScale
						? 'stroke-current stroke-[0.25] opacity-70'
						: 'stroke-current stroke-[0.2] opacity-35';
					const tonicBoundaryClass = 'stroke-sky-700 stroke-[0.5] opacity-95';
					return (
						<line
							className={isTonicBoundary ? tonicBoundaryClass : scaleClass}
							x1={polar(VIEW_CENTER, VIEW_CENTER, R_HUB, s.wedgeStartRad).x}
							y1={polar(VIEW_CENTER, VIEW_CENTER, R_HUB, s.wedgeStartRad).y}
							x2={polar(VIEW_CENTER, VIEW_CENTER, R_OUTER, s.wedgeStartRad).x}
							y2={polar(VIEW_CENTER, VIEW_CENTER, R_OUTER, s.wedgeStartRad).y}
							key={`rad-${s.majorIndex}`}
						/>
					);
				})}
			</g>
		</>
	);
}

export const CircleOfFifthsRings = memo(CircleOfFifthsRingsComponent);
