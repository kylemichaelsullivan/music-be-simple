import { useEscapeReset } from '@/context/shared/useEscapeReset';
import { useLocalStorage } from '@/context/shared/useLocalStorage';
import { useScaleState } from '@/context/shared/useScaleState';
import { useGlobals } from '@/hooks';
import type {
	NoteIndex,
	NoteLabelsButtonIcon,
	ScaleMode,
	ScaleType,
	ScalesContextProviderProps,
} from '@/types';
import { getNote, isValidNoteIndex } from '@/utils';
import { useCallback, useMemo } from 'react';
import { z } from 'zod';
import { ScalesContext } from './ScalesContext';

export { ScalesContext };

const initialTonic: NoteIndex = 0;
const initialVariant: ScaleType = 'major';
const initialShowNoteLabels: boolean = true;

export const ScalesContextProvider = ({ children }: ScalesContextProviderProps) => {
	const { usingFlats } = useGlobals();

	const { tonic, variant, notes, handleTonicChange, handleVariantChange, makeScale, reset } =
		useScaleState<ScaleType>({
			initialTonic,
			initialVariant,
		});

	const [showNoteLabels, setShowNoteLabels] = useLocalStorage(
		'showNoteLabels',
		z.boolean(),
		initialShowNoteLabels
	);

	const getRelativeMajor = useCallback(
		(mode: ScaleMode) => {
			// For each mode, calculate the relative major key that shares the key signature
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
			// For each mode, calculate the relative minor key that shares the key signature
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
