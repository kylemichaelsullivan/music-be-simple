import type { KeyboardEvent } from 'react';
import { memo, useCallback } from 'react';
import type { NoteIndex } from '@/types';
import { circleOfFifthsTonicHex } from '@/utils';
import type { CircleOfFifthsSegment } from './circleOfFifthsTypes';

function tonicWedgeFill(hex: string, role: 'current' | 'inScale' | 'other'): string {
	if (role === 'current') {
		return hex;
	}
	if (role === 'inScale') {
		return `color-mix(in srgb, ${hex} 58%, white)`;
	}
	return `color-mix(in srgb, ${hex} 6%, white)`;
}

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
				const hex = circleOfFifthsTonicHex(s.majorIndex);
				const role = s.isCurrentTonic ? 'current' : s.inSelectedScale ? 'inScale' : 'other';
				const strokeClass = s.isCurrentTonic
					? 'stroke-slate-900 stroke-[0.55] hover:brightness-110 focus-visible:brightness-110 focus-visible:stroke-[0.7]'
					: 'stroke-slate-800/80 stroke-[0.35] hover:brightness-110 focus-visible:stroke-[0.55] focus-visible:brightness-105';
				return (
					// biome-ignore lint/a11y/useSemanticElements: wedge geometry must be an SVG path
					<path
						className={[
							'CircleOfFifthsTonicWedges cursor-pointer transition-[fill,stroke-width,filter] outline-none',
							strokeClass,
						].join(' ')}
						fill={tonicWedgeFill(hex, role)}
						role='button'
						d={s.majorWedgePath}
						aria-label={`Set tonic to ${s.majorLabel}`}
						aria-pressed={s.isCurrentTonic}
						onClick={() => onTonicSelect(s.majorIndex)}
						onKeyDown={(e) => onKeyActivate(e, s.majorIndex)}
						tabIndex={0}
						key={`tonic-${s.majorIndex}`}
					>
						<title>{s.majorLabel}</title>
					</path>
				);
			})}
		</>
	);
}

export const CircleOfFifthsTonicWedges = memo(CircleOfFifthsTonicWedgesComponent);
