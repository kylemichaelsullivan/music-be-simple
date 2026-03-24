import type { NoteIndex, ScaleType } from '@/types';

/** Pitch class at the top of the circle (clockwise = ascending fifths). */
const CIRCLE_TOP_PITCH_CLASS = 0 satisfies NoteIndex;

/**
 * Perfect-fifths pitch-class order with C at the top.
 * Indices map via `getNote(noteIndex, usingFlats)` for sharps/flats rendering.
 */
export const CIRCLE_OF_FIFTHS_ORDER: readonly NoteIndex[] = Array.from(
	{ length: 12 },
	(_, i) => ((CIRCLE_TOP_PITCH_CLASS + i * 7) % 12) as NoteIndex
);

/**
 * Signed accidental count for major key when the tonic is spelled with sharps (SHARPS column).
 * Positive = sharps, negative = flats (F major always has one flat in notation).
 */
function computeSharpSpellingMajorSigned(): readonly number[] {
	const sig: number[] = Array(12).fill(0);
	let p: NoteIndex = 0;
	for (let n = 0; n <= 10; n++) {
		sig[p] = n;
		p = ((p + 7) % 12) as NoteIndex;
	}
	sig[5] = -1;
	return sig;
}

const SHARP_SPELLING_MAJOR_SIGNED = computeSharpSpellingMajorSigned();

/**
 * Signed accidental count when the tonic is spelled with flats (FLATS column).
 * Flat keys on the fourths side of C overwrite; other pitch classes keep sharp-spelling counts
 * (e.g. D major stays 2♯ even in flats mode).
 */
const FLAT_SPELLING_MAJOR_SIGNED: readonly number[] = (() => {
	const sig = [...SHARP_SPELLING_MAJOR_SIGNED];
	let p: NoteIndex = 5;
	for (let n = 1; n <= 6; n++) {
		sig[p] = -n;
		p = ((p + 5) % 12) as NoteIndex;
	}
	sig[0] = 0;
	return sig;
})();

/**
 * Signed major-key accidental count for a pitch class given enharmonic spelling preference.
 * Positive = sharps, negative = flats, 0 = none (C major / A minor natural, etc.).
 */
export function majorKeyAccidentalSigned(pitchClass: NoteIndex, usingFlats: boolean): number {
	const table = usingFlats ? FLAT_SPELLING_MAJOR_SIGNED : SHARP_SPELLING_MAJOR_SIGNED;
	return table[pitchClass] ?? 0;
}

/** Short key-signature label for a major tonic at this pitch class (spelling follows `usingFlats`). */
export function majorKeySignatureLabel(pitchClass: NoteIndex, usingFlats: boolean): string {
	const n = majorKeyAccidentalSigned(pitchClass, usingFlats);
	if (n === 0) {
		return '—';
	}
	if (n > 0) {
		return `${n}♯`;
	}
	return `${-n}♭`;
}

/**
 * Innermost key-signature ring (around the hub). Uses enharmonic complements so one accidental type matches the UI:
 * — Sharp mode: sharp keys show `n♯`; flat keys (e.g. F) show `(12 − |flats|)♯` (F → `11♯`).
 * — Flat mode: flat keys show `n♭`; keys still spelled with sharps in the flat table show `(12 − sharpN)♭` (G→`11♭`, …, B→`7♭`).
 */
export function circleInnerKeySignatureLabel(pitchClass: NoteIndex, usingFlats: boolean): string {
	if (usingFlats) {
		const nFlatPref = majorKeyAccidentalSigned(pitchClass, true);
		if (nFlatPref < 0) {
			return `${-nFlatPref}♭`;
		}
		if (nFlatPref > 0) {
			const sharpN = majorKeyAccidentalSigned(pitchClass, false);
			return `${12 - sharpN}♭`;
		}
		return '—';
	}
	const nSharpPref = majorKeyAccidentalSigned(pitchClass, false);
	if (nSharpPref > 0) {
		return `${nSharpPref}♯`;
	}
	if (nSharpPref < 0) {
		return `${12 + nSharpPref}♯`;
	}
	return '—';
}

/**
 * Maps a scale tonic/variant to the major-key tonic that shares the same key signature.
 * This lets signature counts follow modal/relative relationships (e.g. A minor -> C major).
 */
export function keySignatureMajorTonicForVariant(tonic: NoteIndex, variant: ScaleType): NoteIndex {
	const offsetByVariant: Partial<Record<ScaleType, number>> = {
		// Major-family and relatives
		major: 0,
		ionian: 0,
		lydian: 7,
		mixolydian: 5,
		dorian: 10,
		aeolian: 3,
		minor: 3,
		phrygian: 8,
		locrian: 1,
		// Common extensions mapped to their closest modal/key-signature family
		pentatonic: 0,
		'major-blues': 0,
		'dominant-pentatonic': 5,
		'minor-pentatonic': 3,
		'minor-blues': 3,
		'melodic-minor': 3,
		'harmonic-minor': 3,
	};

	const offset = offsetByVariant[variant] ?? 0;
	return ((tonic + offset) % 12) as NoteIndex;
}

/** Relative minor tonic (natural minor) for a major tonic sharing the same key signature. */
export function relativeMinorTonic(majorTonic: NoteIndex): NoteIndex {
	return ((majorTonic + 9) % 12) as NoteIndex;
}
