import { useEscapeReset, useLocalStorage } from '@/context/shared';
import { useGlobals } from '@/hooks';
import { ChordsStorageSchema } from '@/schemas';
import { useChordsStore } from '@/stores';
import type {
	Chord_Tonic,
	Chord_Variant,
	ChordsContextProviderProps,
	NerdModeButtonIcon,
	NoteIndex,
	border,
} from '@/types';
import { generateChordNotes, getChordInfo, getChordSymbol, getNote } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { ChordsContext } from './ChordsContext';

export { ChordsContext };

const initialShowNerdMode: boolean = true;

export const ChordsContextProvider = ({ children }: ChordsContextProviderProps) => {
	const { usingFlats } = useGlobals();
	const { tonic, variant, setTonic, setVariant, reset: resetStore } = useChordsStore();

	const [notes, setNotes] = useState<NoteIndex[]>(() => generateChordNotes(tonic, variant));

	useEffect(() => {
		setNotes(generateChordNotes(tonic, variant));
	}, [tonic, variant]);

	const handleTonicChange = useCallback(
		(newTonic: Chord_Tonic) => {
			setTonic(newTonic);
		},
		[setTonic]
	);

	const handleVariantChange = useCallback(
		(newVariant: Chord_Variant) => {
			setVariant(newVariant);
		},
		[setVariant]
	);

	const makeChord = useCallback(
		(chordTonic: Chord_Tonic, chordVariant: Chord_Variant) => {
			setTonic(chordTonic);
			setVariant(chordVariant);
		},
		[setTonic, setVariant]
	);

	const getBorderStyleFromState = useCallback(
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

	const reset = useCallback(() => {
		resetStore();
	}, [resetStore]);

	const [showNerdMode, setShowNerdMode] = useLocalStorage(
		'showNerdMode',
		z.boolean(),
		initialShowNerdMode
	);

	useEffect(() => {
		const combinedData = {
			tonic,
			variant,
			showNerdMode,
		};
		const result = ChordsStorageSchema.safeParse(combinedData);
		if (!result.success) {
			console.warn('Chords storage data validation failed:', result.error.format());
		}
	}, [tonic, variant, showNerdMode]);

	const getBorderStyle = useMemo(
		() =>
			(note: NoteIndex): border =>
				getBorderStyleFromState(note, showNerdMode),
		[getBorderStyleFromState, showNerdMode]
	);

	const chordName = useMemo(() => {
		const note = getNote(tonic, usingFlats);
		if (variant === 'major') {
			return note;
		}
		const symbol = getChordSymbol(variant, showNerdMode);
		return `${note}${symbol}`;
	}, [tonic, variant, usingFlats, showNerdMode]);

	const noteCount = useMemo(() => notes.length, [notes]);

	const toggleNerdMode = useCallback(() => {
		setShowNerdMode((prev: boolean) => !prev);
	}, [setShowNerdMode]);

	const nerdModeButtonTitle = useMemo(
		() => (showNerdMode ? 'Show Jazz Notation?' : 'Show Nerd Notation?'),
		[showNerdMode]
	);

	const nerdModeButtonIcon = useMemo<NerdModeButtonIcon>(
		() => (showNerdMode ? '🤓' : '💃🏾'),
		[showNerdMode]
	);

	useEscapeReset(reset);

	const contextValue = useMemo(
		() => ({
			tonic,
			variant,
			notes,
			chordName,
			noteCount,
			showNerdMode,
			handleTonicChange,
			handleVariantChange,
			getBorderStyle,
			makeScale: makeChord,
			toggleNerdMode,
			nerdModeButtonTitle,
			nerdModeButtonIcon,
			reset,
		}),
		[
			tonic,
			variant,
			notes,
			chordName,
			noteCount,
			showNerdMode,
			handleTonicChange,
			handleVariantChange,
			getBorderStyle,
			makeChord,
			toggleNerdMode,
			nerdModeButtonTitle,
			nerdModeButtonIcon,
			reset,
		]
	);

	return <ChordsContext.Provider value={contextValue}>{children}</ChordsContext.Provider>;
};
