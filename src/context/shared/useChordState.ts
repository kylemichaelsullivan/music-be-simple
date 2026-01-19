import type { Chord_Tonic, Chord_Variant, NoteIndex, border } from '@/types';
import { generateChordNotes, getChordInfo } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

export type UseChordStateOptions = {
	initialTonic: Chord_Tonic;
	initialVariant: Chord_Variant;
};

export type UseChordStateReturn = {
	tonic: Chord_Tonic;
	variant: Chord_Variant;
	notes: NoteIndex[];
	setTonic: (tonic: Chord_Tonic) => void;
	setVariant: (variant: Chord_Variant) => void;
	handleTonicChange: (tonic: Chord_Tonic) => void;
	handleVariantChange: (variant: Chord_Variant) => void;
	makeChord: (tonic: Chord_Tonic, variant: Chord_Variant) => void;
	getBorderStyle: (note: NoteIndex, showNerdMode: boolean) => border;
	reset: () => void;
};

export function useChordState({
	initialTonic,
	initialVariant,
}: UseChordStateOptions): UseChordStateReturn {
	const [tonic, setTonic] = useState<Chord_Tonic>(initialTonic);
	const [variant, setVariant] = useState<Chord_Variant>(initialVariant);
	const [notes, setNotes] = useState<NoteIndex[]>(() =>
		generateChordNotes(initialTonic, initialVariant)
	);

	const handleTonicChange = useCallback((newTonic: Chord_Tonic) => {
		setTonic(newTonic);
	}, []);

	const handleVariantChange = useCallback((newVariant: Chord_Variant) => {
		setVariant(newVariant);
	}, []);

	const makeChord = useCallback((chordTonic: Chord_Tonic, chordVariant: Chord_Variant) => {
		setNotes(generateChordNotes(chordTonic, chordVariant));
	}, []);

	const reset = useCallback(() => {
		setTonic(initialTonic);
		setVariant(initialVariant);
	}, [initialTonic, initialVariant]);

	const getBorderStyle = useCallback(
		(note: number, showNerdMode: boolean): border => {
			if (showNerdMode || note === tonic) {
				return 'none';
			}

			const chordInfo = getChordInfo(variant);
			let currentSemitones = 0;

			for (let i = 0; i < chordInfo.intervals.length; i++) {
				const [interval, , style] = chordInfo.intervals[i];
				currentSemitones += interval * 2;
				const noteIndex = (tonic + currentSemitones) % 12;

				if (noteIndex === note) {
					return style;
				}
			}

			return 'solid';
		},
		[tonic, variant]
	);

	useEffect(() => {
		makeChord(tonic, variant);
	}, [tonic, variant, makeChord]);

	return {
		tonic,
		variant,
		notes,
		setTonic,
		setVariant,
		handleTonicChange,
		handleVariantChange,
		makeChord,
		getBorderStyle,
		reset,
	};
}
