import { useGlobals, useScales } from '@/hooks';
import type { NoteIndex, ScaleMode } from '@/types';
import { INTERVALS, SCALE_TYPES, getNote, isValidNoteIndex } from '@/utils';
import { memo, useMemo } from 'react';
import Mode from './Mode';
import ModesHeading from './ModesHeading';

function isScaleMode(mode: ScaleMode) {
	return (
		mode === 'ionian' ||
		mode === 'dorian' ||
		mode === 'phrygian' ||
		mode === 'lydian' ||
		mode === 'mixolydian' ||
		mode === 'aeolian' ||
		mode === 'locrian'
	);
}

function Modes() {
	const { usingFlats } = useGlobals();
	const { tonic, variant, getRelativeMajor, getRelativeMinor } = useScales();

	const generateModes = useMemo(
		() => (tonic: NoteIndex) => {
			const modes = SCALE_TYPES.filter(
				(key) => key !== 'major' && key !== 'minor' && key !== 'pentatonic'
			).filter(isScaleMode);

			return modes.map((mode) => {
				const intervals = INTERVALS[mode];
				const modeNotes: NoteIndex[] = [tonic];
				let currentNote = tonic;
				for (const interval of intervals) {
					currentNote += interval * 2;
					const noteIndex = currentNote % 12;
					if (isValidNoteIndex(noteIndex)) {
						modeNotes.push(noteIndex);
					}
				}
				return {
					mode,
					notes: modeNotes.map((note) => getNote(note, usingFlats)),
					relativeMajor: getRelativeMajor(mode),
					relativeMinor: getRelativeMinor(mode),
				};
			});
		},
		[usingFlats, getRelativeMajor, getRelativeMinor]
	);

	const modes = useMemo(() => generateModes(tonic), [tonic, generateModes]);

	const isCurrentMode = useMemo(
		() => (mode: string) => {
			return (
				(variant === 'major' && mode === 'ionian') ||
				(variant === 'minor' && mode === 'aeolian') ||
				variant === mode
			);
		},
		[variant]
	);

	return (
		<div className='Modes border border-slate-500 text-center capitalize shadow-md'>
			<ModesHeading tonicNote={getNote(tonic, usingFlats)} />

			{modes.map(({ mode, notes, relativeMajor, relativeMinor }, index) => (
				<Mode
					mode={mode}
					notes={notes}
					background={index % 2 !== 0 ? 'bg-slate-300' : 'bg-slate-200'}
					isCurrent={isCurrentMode(mode)}
					relativeMajor={relativeMajor}
					relativeMinor={relativeMinor}
					key={mode}
				/>
			))}
		</div>
	);
}

export default memo(Modes);
