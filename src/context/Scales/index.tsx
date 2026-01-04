import { useEscapeReset } from '@/context/shared/useEscapeReset';
import { useLocalStorage } from '@/context/shared/useLocalStorage';
import { useGlobals } from '@/hooks';
import { useScalesStore } from '@/stores/scalesStore';
import type {
	NoteIndex,
	NoteLabelsButtonIcon,
	ScaleMode,
	ScaleType,
	ScalesContextProviderProps,
} from '@/types';
import { generateNotesFromIntervals, getNote, isValidNoteIndex } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { ScalesContext } from './ScalesContext';

export { ScalesContext };

const initialShowNoteLabels: boolean = true;

export const ScalesContextProvider = ({ children }: ScalesContextProviderProps) => {
	const { usingFlats } = useGlobals();
	const { tonic, variant, setTonic, setVariant, reset: resetStore } = useScalesStore();

	const [notes, setNotes] = useState<NoteIndex[]>(() => generateNotesFromIntervals(tonic, variant));

	useEffect(() => {
		const scaleNotes = generateNotesFromIntervals(tonic, variant);
		setNotes(scaleNotes);
	}, [tonic, variant]);

	const handleTonicChange = useCallback(
		(newTonic: NoteIndex) => {
			setTonic(newTonic);
		},
		[setTonic]
	);

	const handleVariantChange = useCallback(
		(newVariant: ScaleType) => {
			setVariant(newVariant);
		},
		[setVariant]
	);

	const makeScale = useCallback(
		(scaleTonic: NoteIndex, scaleVariant: ScaleType) => {
			setTonic(scaleTonic);
			setVariant(scaleVariant);
		},
		[setTonic, setVariant]
	);

	const reset = useCallback(() => {
		resetStore();
	}, [resetStore]);

	const [showNoteLabels, setShowNoteLabels] = useLocalStorage(
		'showNoteLabels',
		z.boolean(),
		initialShowNoteLabels
	);

	const getRelativeMajor = useCallback(
		(mode: ScaleMode) => {
			let relativeMajorNote: number;

			switch (mode) {
				case 'lydian':
					relativeMajorNote = (tonic + 7) % 12;
					break;
				case 'ionian':
					relativeMajorNote = tonic;
					break;
				case 'mixolydian':
					relativeMajorNote = (tonic + 5) % 12;
					break;
				case 'dorian':
					relativeMajorNote = (tonic + 10) % 12;
					break;
				case 'aeolian':
					relativeMajorNote = (tonic + 3) % 12;
					break;
				case 'phrygian':
					relativeMajorNote = (tonic + 8) % 12;
					break;
				case 'locrian':
					relativeMajorNote = (tonic + 1) % 12;
					break;
				default:
					relativeMajorNote = tonic;
			}

			if (!isValidNoteIndex(relativeMajorNote)) {
				throw new Error(`Invalid note index: ${relativeMajorNote}`);
			}

			return getNote(relativeMajorNote, usingFlats);
		},
		[tonic, usingFlats]
	);

	const getRelativeMinor = useCallback(
		(mode: ScaleMode) => {
			let relativeMinorNote: number;

			switch (mode) {
				case 'lydian':
					relativeMinorNote = (tonic + 4) % 12;
					break;
				case 'ionian':
					relativeMinorNote = (tonic + 9) % 12;
					break;
				case 'mixolydian':
					relativeMinorNote = (tonic + 2) % 12;
					break;
				case 'dorian':
					relativeMinorNote = (tonic + 7) % 12;
					break;
				case 'aeolian':
					relativeMinorNote = tonic;
					break;
				case 'phrygian':
					relativeMinorNote = (tonic + 5) % 12;
					break;
				case 'locrian':
					relativeMinorNote = (tonic + 10) % 12;
					break;
				default:
					relativeMinorNote = tonic;
			}

			if (!isValidNoteIndex(relativeMinorNote)) {
				throw new Error(`Invalid note index: ${relativeMinorNote}`);
			}

			return getNote(relativeMinorNote, usingFlats);
		},
		[tonic, usingFlats]
	);

	const toggleNoteLabels = useCallback(() => {
		setShowNoteLabels((prev: boolean) => !prev);
	}, [setShowNoteLabels]);

	const noteLabelsButtonTitle = useMemo(
		() => (showNoteLabels ? 'Hide Notes?' : 'Show Notes?'),
		[showNoteLabels]
	);

	const noteLabelsButtonIcon = useMemo<NoteLabelsButtonIcon>(
		() => (showNoteLabels ? '📖' : '📕'),
		[showNoteLabels]
	);

	useEscapeReset(reset);

	const contextValue = useMemo(
		() => ({
			tonic,
			variant,
			notes,
			showNoteLabels,
			handleTonicChange,
			handleVariantChange,
			makeScale,
			getRelativeMajor,
			getRelativeMinor,
			toggleNoteLabels,
			noteLabelsButtonTitle,
			noteLabelsButtonIcon,
			reset,
		}),
		[
			tonic,
			variant,
			notes,
			showNoteLabels,
			handleTonicChange,
			handleVariantChange,
			makeScale,
			getRelativeMajor,
			getRelativeMinor,
			toggleNoteLabels,
			noteLabelsButtonTitle,
			noteLabelsButtonIcon,
			reset,
		]
	);

	return <ScalesContext.Provider value={contextValue}>{children}</ScalesContext.Provider>;
};
