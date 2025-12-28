import type { NoteIndex } from '@/types';
import { generateNotesFromIntervals } from '@/utils/scales';
import { useCallback, useEffect, useState } from 'react';

export interface UseScaleStateOptions<Variant extends string> {
	initialTonic: NoteIndex;
	initialVariant: Variant;
}

export interface UseScaleStateReturn<Variant extends string> {
	tonic: NoteIndex;
	variant: Variant;
	notes: NoteIndex[];
	setTonic: (tonic: NoteIndex) => void;
	setVariant: (variant: Variant) => void;
	handleTonicChange: (tonic: NoteIndex) => void;
	handleVariantChange: (variant: Variant) => void;
	makeScale: (tonic: NoteIndex, variant: Variant) => void;
	reset: () => void;
}

export function useScaleState<Variant extends string>({
	initialTonic,
	initialVariant,
}: UseScaleStateOptions<Variant>): UseScaleStateReturn<Variant> {
	const [tonic, setTonic] = useState<NoteIndex>(initialTonic);
	const [variant, setVariant] = useState<Variant>(initialVariant);
	const [notes, setNotes] = useState<NoteIndex[]>(() =>
		generateNotesFromIntervals(initialTonic, initialVariant)
	);

	const handleTonicChange = useCallback((newTonic: NoteIndex) => {
		setTonic(newTonic);
	}, []);

	const handleVariantChange = useCallback((newVariant: Variant) => {
		setVariant(newVariant);
	}, []);

	const makeScale = useCallback((scaleTonic: NoteIndex, scaleVariant: Variant) => {
		const scaleNotes = generateNotesFromIntervals(scaleTonic, scaleVariant);
		setNotes(scaleNotes);
	}, []);

	const reset = useCallback(() => {
		setTonic(initialTonic);
		setVariant(initialVariant);
	}, [initialTonic, initialVariant]);

	useEffect(() => {
		makeScale(tonic, variant);
	}, [tonic, variant, makeScale]);

	return {
		tonic,
		variant,
		notes,
		setTonic,
		setVariant,
		handleTonicChange,
		handleVariantChange,
		makeScale,
		reset,
	};
}
