import { memo } from 'react';
import { R_HUB, VIEW_CENTER } from './circleOfFifthsGeometry';
import type { CircleOfFifthsSegment } from './circleOfFifthsTypes';

type CircleOfFifthsLabelsProps = {
	segments: CircleOfFifthsSegment[];
};

function ringTextClass(s: CircleOfFifthsSegment, ring: 'interval' | 'signature' | 'note'): string {
	const base = s.isCurrentTonic ? 'opacity-100' : s.inSelectedScale ? 'opacity-90' : 'opacity-30';
	if (ring === 'note') {
		return s.isCurrentTonic ? `${base} text-sky-950 font-bold` : `${base} font-semibold`;
	}
	if (s.isCurrentTonic) {
		return `${base} text-sky-900`;
	}
	return base;
}

function CircleOfFifthsLabelsComponent({ segments }: CircleOfFifthsLabelsProps) {
	return (
		<>
			<g className='pointer-events-none select-none'>
				{segments.map((s) => (
					<text
						className={`fill-current font-serif ${s.isCurrentTonic ? 'text-[4.15px]' : 'text-[3.65px]'} ${ringTextClass(s, 'note')}`}
						x={s.majorLabelPosition.x}
						y={s.majorLabelPosition.y}
						textAnchor='middle'
						dominantBaseline='middle'
						key={`lab-${s.majorIndex}`}
					>
						{s.majorLabel}
					</text>
				))}
			</g>

			<g className='pointer-events-none select-none' aria-hidden>
				{segments.map((s) => (
					<text
						className={`fill-current font-serif text-[2.85px] ${ringTextClass(s, 'interval')}`}
						x={s.intervalLabelPosition.x}
						y={s.intervalLabelPosition.y}
						textAnchor='middle'
						dominantBaseline='middle'
						key={`iv-${s.majorIndex}`}
					>
						{s.intervalLabel}
					</text>
				))}
			</g>

			<g className='pointer-events-none select-none' aria-hidden>
				{segments.map((s) => (
					<text
						className={`fill-current font-serif text-[2.55px] ${ringTextClass(s, 'signature')}`}
						x={s.sigLabelPosition.x}
						y={s.sigLabelPosition.y}
						textAnchor='middle'
						dominantBaseline='middle'
						key={`sig-${s.majorIndex}`}
					>
						{s.sigLabel}
					</text>
				))}
			</g>

			<circle
				className='fill-slate-50 stroke-current stroke-[0.35] pointer-events-none'
				cx={VIEW_CENTER}
				cy={VIEW_CENTER}
				r={R_HUB}
			/>
		</>
	);
}

export const CircleOfFifthsLabels = memo(CircleOfFifthsLabelsComponent);
