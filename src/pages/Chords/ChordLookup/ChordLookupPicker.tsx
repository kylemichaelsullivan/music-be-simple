import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useButtonHandler } from '@/hooks';
import type { NoteIndex } from '@/types';
import { isValidNoteIndex, rangeOfLength } from '@/utils';
import { ChordLookupPitchButton } from './ChordLookupPitchButton';

type ChordLookupPickerProps = {
	selectionMask: number;
	usingFlats: boolean;
	onToggle: (note: NoteIndex) => void;
	onClear: () => void;
};

function ChordLookupPickerComponent({
	selectionMask,
	usingFlats,
	onToggle,
	onClear,
}: ChordLookupPickerProps) {
	const { handleClick: handleClearClick, handleKeyDown: handleClearKeyDown } =
		useButtonHandler(onClear);
	const hasSelection = selectionMask !== 0;

	const pitchNotes = useMemo(
		() => rangeOfLength(12).filter((n): n is NoteIndex => isValidNoteIndex(n)),
		[]
	);

	const isSelected = useCallback(
		(note: NoteIndex) => (selectionMask & (1 << note)) !== 0,
		[selectionMask]
	);

	return (
		<fieldset className='ChordLookupPicker min-w-0 border-0 p-0'>
			<legend className='sr-only'>Pick pitches</legend>
			<div className='relative flex w-full min-w-0 justify-center overflow-x-auto'>
				<div className='ChordLookupKeyboard'>
					{pitchNotes.map((note) => (
						<ChordLookupPitchButton
							note={note}
							isSelected={isSelected(note)}
							usingFlats={usingFlats}
							onToggle={onToggle}
							key={note}
						/>
					))}
				</div>
				<button
					type='button'
					className={clsx(
						'ChordLookupPicker-clear absolute top-0 right-0 flex h-6 w-6 shrink-0 items-center justify-center border border-slate-500 bg-white text-base leading-none hover:bg-slate-100 hover:ring-1',
						!hasSelection && 'invisible pointer-events-none'
					)}
					title='Clear'
					aria-label='Clear'
					tabIndex={hasSelection ? 0 : -1}
					disabled={!hasSelection}
					onClick={handleClearClick}
					onKeyDown={handleClearKeyDown}
				>
					×
				</button>
			</div>
		</fieldset>
	);
}

export const ChordLookupPicker = memo(ChordLookupPickerComponent);
