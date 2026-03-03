import type { border } from './chords';

type BorderPosition = 'bottom' | 'all';
type BorderType = 'border' | 'outline';

const STYLE_CLASSES = {
	dashed: { border: 'border-dashed', outline: 'outline-dashed' },
	dotted: { border: 'border-dotted', outline: 'outline-dotted' },
	solid: { border: 'border-solid', outline: 'outline-solid' },
	double: { border: 'border-double', outline: 'outline-double' },
} as const;

export function getBorderClass(
	style: border,
	position: BorderPosition = 'all',
	type: BorderType = 'border'
): string {
	if (style === 'none') return '';

	if (type === 'outline') {
		const outlineStyle = STYLE_CLASSES[style]?.outline;
		const borderStyle = STYLE_CLASSES[style]?.border;
		return outlineStyle && borderStyle
			? `outline-[3px] outline ${outlineStyle} ${borderStyle}`
			: '';
	}

	const borderPrefix = position === 'bottom' ? 'border-b-[3px]' : 'border-[3px]';
	const borderStyle = STYLE_CLASSES[style]?.border;
	return borderStyle ? `${borderPrefix} ${borderStyle}` : '';
}
