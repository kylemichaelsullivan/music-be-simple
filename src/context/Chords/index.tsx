import {
	initialTonic,
	initialVariant,
	useEscapeReset,
	useRequireGlobals,
	useScaleState,
} from '@/context';
import type { Chord_Variant, ChordsContextProviderProps, border } from '@/types';
import { getChordInfo } from '@/utils/chords';
import { useCallback, useMemo } from 'react';
import { ChordsContext } from './ChordsContext';

export { ChordsContext };

export const ChordsContextProvider = ({ children }: ChordsContextProviderProps) => {
	useRequireGlobals(); // Ensure GlobalsContext is available

	const { tonic, variant, notes, handleTonicChange, handleVariantChange, makeScale, reset } =
		useScaleState<Chord_Variant>({
			initialTonic,
			initialVariant,
		});

	const getBorderStyle = useCallback(
		(note: number): border => {
			// For chords, get the border style from the chord info
			try {
				const chordInfo = getChordInfo(variant);
				const noteIndex = notes.indexOf(note);
				if (noteIndex >= 0 && noteIndex < chordInfo.intervals.length) {
					return chordInfo.intervals[noteIndex][2];
				}
			} catch {
				// If variant is not a chord variant, return default
			}
			return 'solid';
		},
		[variant, notes]
	);

	const chordName = useMemo(() => {
		try {
			const chordInfo = getChordInfo(variant);
			return chordInfo.display;
		} catch {
			return '';
		}
	}, [variant]);

	const noteCount = useMemo(() => notes.length, [notes]);

	useEscapeReset(reset);

	const contextValue = useMemo(
		() => ({
			tonic,
			variant,
			notes,
			chordName,
			noteCount,
			handleTonicChange,
			handleVariantChange,
			getBorderStyle,
			makeScale,
			reset,
		}),
		[
			tonic,
			variant,
			notes,
			chordName,
			noteCount,
			handleTonicChange,
			handleVariantChange,
			getBorderStyle,
			makeScale,
			reset,
		]
	);

	return <ChordsContext.Provider value={contextValue}>{children}</ChordsContext.Provider>;
};
