import type { border } from './chords';

type BorderPosition = 'bottom' | 'all';

export function getBorderClass(style: border, position: BorderPosition = 'all'): string {
	const borderPrefix = position === 'bottom' ? 'border-b-[3px]' : 'border-[3px]';

	// ensure Tailwind classes are compiled
	switch (style) {
		case 'solid':
			return `${borderPrefix} border-solid`;
		case 'dashed':
			return `${borderPrefix} border-dashed`;
		case 'dotted':
			return `${borderPrefix} border-dotted`;
		case 'double':
			return `${borderPrefix} border-double`;
		default:
			return '';
	}
}
