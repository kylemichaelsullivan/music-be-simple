import { useGlobals, useScales } from '@/hooks';
import type { ScaleMode } from '@/types';
import { INTERVALS } from '@/utils/notes';
import { memo, useMemo } from 'react';
import Mode from './Mode';
import ModesHeading from './ModesHeading';

function Modes() {
	const { tonic, variant, getRelativeMajor, getRelativeMinor } = useScales();
	const { getNote } = useGlobals();

	const generateModes = useMemo(
		() => (tonic: number) => {
			const modes = Object.keys(INTERVALS as Record<string, readonly number[]>).filter(
				(key) => key !== 'major' && key !== 'minor' && key !== 'pentatonic'
			) as Array<keyof typeof INTERVALS>;

			return modes.map((mode) => {
				const intervals = INTERVALS[mode];
				const modeNotes: number[] = [tonic];
				let currentNote = tonic;
				for (const interval of intervals) {
					currentNote += interval * 2;
					modeNotes.push(currentNote % 12);
				}
				return {
					mode,
					notes: modeNotes.map(getNote),
					relativeMajor: getRelativeMajor(mode as ScaleMode),
					relativeMinor: getRelativeMinor(mode as ScaleMode),
				};
			});
		},
		[getNote, getRelativeMajor, getRelativeMinor]
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
			<ModesHeading tonicNote={getNote(tonic)} />

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
