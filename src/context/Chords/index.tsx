import {
	initialTonic,
	initialVariant,
	useEscapeReset,
	useRequireGlobals,
	useScaleState,
} from '@/context';
import type { Chord_Variant, ChordsContextProviderProps, border } from '@/types';
import { getChordInfo, getChordSymbol } from '@/utils/chords';
import { useCallback, useMemo } from 'react';
import { ChordsContext } from './ChordsContext';

export { ChordsContext };

export const ChordsContextProvider = ({ children }: ChordsContextProviderProps) => {
	const globals = useRequireGlobals(); // Ensure GlobalsContext is available

	const { tonic, variant, notes, handleTonicChange, handleVariantChange, makeScale, reset } =
		useScaleState<Chord_Variant>({
			initialTonic,
			initialVariant,
		});

	const getBorderStyle = useCallback(
		(note: number): border => {
			if (globals.showNerdMode || note === tonic) {
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
		[tonic, variant, globals.showNerdMode]
	);

	const chordName = useMemo(() => {
		const note = globals.getNote(tonic);
		if (variant === 'major') {
			return note;
		}
		const symbol = getChordSymbol(variant, globals.showNerdMode);
		return `${note}${symbol}`;
	}, [tonic, variant, globals]);

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
