import type { KeyboardEvent } from 'react';
import { memo, useCallback } from 'react';
import type { NoteIndex } from '@/types';
import type { CircleOfFifthsSegment } from './circleOfFifthsTypes';

type CircleOfFifthsTonicWedgesProps = {
	segments: CircleOfFifthsSegment[];
	onTonicSelect: (noteIndex: NoteIndex) => void;
};

function CircleOfFifthsTonicWedgesComponent({
	segments,
	onTonicSelect,
}: CircleOfFifthsTonicWedgesProps) {
	const onKeyActivate = useCallback(
		(e: KeyboardEvent<SVGPathElement>, noteIndex: NoteIndex) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onTonicSelect(noteIndex);
			}
		},
		[onTonicSelect]
	);

	return (
		<>
			{segments.map((s) => {
				const wedgeFill = s.isCurrentTonic
					? 'fill-sky-200/95 stroke-sky-900 stroke-[0.55] hover:fill-sky-300/90 focus-visible:fill-sky-300/85 focus-visible:stroke-[0.7] focus-visible:stroke-sky-950'
					: s.inSelectedScale
						? 'fill-slate-50/90 stroke-slate-800/80 stroke-[0.35] hover:fill-slate-200/95 focus-visible:stroke-[0.55] focus-visible:fill-slate-200'
						: 'fill-slate-200/35 stroke-slate-400/45 stroke-[0.35] hover:fill-slate-200/95 focus-visible:stroke-[0.55] focus-visible:fill-slate-200';
				return (
					<path
						className={[
							'CircleOfFifthsTonicWedges cursor-pointer transition-[fill,stroke-width] outline-none',
							wedgeFill,
						].join(' ')}
						role='button'
						d={s.majorWedgePath}
						aria-label={`Set tonic to ${s.majorLabel}`}
						aria-pressed={s.isCurrentTonic}
						onClick={() => onTonicSelect(s.majorIndex)}
						onKeyDown={(e) => onKeyActivate(e, s.majorIndex)}
						tabIndex={0}
						key={`tonic-${s.majorIndex}`}
					/>
				);
			})}
		</>
	);
}

export const CircleOfFifthsTonicWedges = memo(CircleOfFifthsTonicWedgesComponent);
