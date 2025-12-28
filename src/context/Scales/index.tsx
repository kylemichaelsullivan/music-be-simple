import { useEscapeReset } from '@/context/shared/useEscapeReset';
import { useLocalStorage } from '@/context/shared/useLocalStorage';
import { useRequireGlobals } from '@/context/shared/useRequireGlobals';
import { useScaleState } from '@/context/shared/useScaleState';
import type { NoteIndex, ScaleMode, ScaleType } from '@/types';
import type { ScalesContextProviderProps } from '@/types/scales';
import { useCallback, useMemo } from 'react';
import { ScalesContext } from './ScalesContext';

export { ScalesContext };

const initialTonic: NoteIndex = 0;
const initialVariant: ScaleType = 'major';
const initialShowNoteLabels: boolean = true;

export const ScalesContextProvider = ({ children }: ScalesContextProviderProps) => {
	const globals = useRequireGlobals();

	const { tonic, variant, notes, handleTonicChange, handleVariantChange, makeScale, reset } =
		useScaleState<ScaleType>({
			initialTonic,
			initialVariant,
		});

	const [showNoteLabels, setShowNoteLabels] = useLocalStorage<boolean>(
		'showNoteLabels',
		initialShowNoteLabels
	);

	const getRelativeMajor = useCallback(
		(mode: ScaleMode) => {
			// For each mode, calculate the relative major key that shares the same key signature
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

			return globals.getNote(relativeMajorNote);
		},
		[tonic, globals]
	);

	const getRelativeMinor = useCallback(
		(mode: ScaleMode) => {
			// For each mode, calculate the relative minor key that shares the same key signature
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

			return globals.getNote(relativeMinorNote);
		},
		[tonic, globals]
	);

	const toggleNoteLabels = useCallback(() => {
		setShowNoteLabels((prev: boolean) => !prev);
	}, [setShowNoteLabels]);

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
			reset,
		]
	);

	return <ScalesContext.Provider value={contextValue}>{children}</ScalesContext.Provider>;
};
