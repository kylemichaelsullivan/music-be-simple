import { initialTonic, initialVariant, useChordState, useEscapeReset } from '@/context';
import { useLocalStorage } from '@/context/shared';
import { useGlobals } from '@/hooks';
import type { ChordsContextProviderProps, NerdModeButtonIcon, NoteIndex, border } from '@/types';
import { getChordSymbol, getNote } from '@/utils';
import { useCallback, useMemo } from 'react';
import { ChordsContext } from './ChordsContext';

export { ChordsContext };

const initialShowNerdMode: boolean = true;

export const ChordsContextProvider = ({ children }: ChordsContextProviderProps) => {
	const { usingFlats } = useGlobals();

	const [showNerdMode, setShowNerdMode] = useLocalStorage<boolean>(
		'showNerdMode',
		initialShowNerdMode
	);

	const {
		tonic,
		variant,
		notes,
		handleTonicChange,
		handleVariantChange,
		makeChord,
		getBorderStyle: getBorderStyleFromState,
		reset,
	} = useChordState({
		initialTonic,
		initialVariant,
	});

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
