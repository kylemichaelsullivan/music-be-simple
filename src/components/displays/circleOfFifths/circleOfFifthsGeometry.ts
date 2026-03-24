export const VIEW_CENTER = 50;
export const R_OUTER = 48.5;
export const R_MAJOR_OUTER = 47;
export const R_MAJOR_INNER = 38.5;
export const R_MID_OUTER = 38.5;
export const R_MID_INNER = 30;
export const R_INTERVAL_OUTER = 30;
export const R_INTERVAL_INNER = 16.5;
export const R_HUB = 14;

export const SEGMENT_DEG = 30;
const HALF_SEGMENT_RAD = ((SEGMENT_DEG / 2) * Math.PI) / 180;

export function polar(cx: number, cy: number, r: number, angleRad: number) {
	return {
		x: cx + r * Math.cos(angleRad),
		y: cy + r * Math.sin(angleRad),
	};
}

/** Annular sector in user space; angles in radians (same convention as `Math.cos` / layout math). */
export function annularWedgePath(
	cx: number,
	cy: number,
	rInner: number,
	rOuter: number,
	angleStart: number,
	angleEnd: number
): string {
	const p0o = polar(cx, cy, rOuter, angleStart);
	const p1o = polar(cx, cy, rOuter, angleEnd);
	const p0i = polar(cx, cy, rInner, angleStart);
	const p1i = polar(cx, cy, rInner, angleEnd);
	const largeArc = 0;
	return [
		`M ${p0o.x} ${p0o.y}`,
		`L ${p0i.x} ${p0i.y}`,
		`A ${rInner} ${rInner} 0 ${largeArc} 1 ${p1i.x} ${p1i.y}`,
		`L ${p1o.x} ${p1o.y}`,
		`A ${rOuter} ${rOuter} 0 ${largeArc} 0 ${p0o.x} ${p0o.y}`,
		'Z',
	].join(' ');
}

export function segmentAnglesRad(index: number) {
	const centerDeg = -90 + index * SEGMENT_DEG;
	const centerRad = (centerDeg * Math.PI) / 180;
	return {
		centerRad,
		startRad: centerRad - HALF_SEGMENT_RAD,
		endRad: centerRad + HALF_SEGMENT_RAD,
	};
}
