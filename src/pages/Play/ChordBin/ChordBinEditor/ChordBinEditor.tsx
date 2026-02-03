import { CloseButton } from '@/components/buttons';
import { InstrumentIcon } from '@/components/icons';
import { useChords, useGlobals, usePlay } from '@/hooks';
import type { ChordBinItemData, InstrumentType } from '@/types';
import { getChordSymbol, getNote, isValidNoteIndex, parseChordName } from '@/utils';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { BanjoEditor } from './BanjoEditor';
import { GuitarEditor } from './GuitarEditor';
import { MandolinEditor } from './MandolinEditor';
import { PianoEditor } from './PianoEditor';
import { StartFret } from '.';
import { UkuleleEditor } from './UkuleleEditor';

type ChordBinEditorProps = {
	item: ChordBinItemData;
	onClose: () => void;
};

export function ChordBinEditor({ item, onClose }: ChordBinEditorProps) {
	const { activeInstrument, updateChordBinItem } = usePlay();
	const { usingFlats } = useGlobals();
	const { showNerdMode } = useChords();
	const editorRef = useRef<HTMLDivElement>(null);
	const justSavedRef = useRef<string | null>(null);

	const note = getNote(item.tonic, usingFlats);
	const symbol = getChordSymbol(item.variant, showNerdMode);
	const computedChordName = item.variant === 'major' ? note : `${note}${symbol}`;
	const initialChordName = item.name ?? computedChordName;

	const [inputValue, setInputValue] = useState(initialChordName);

	const showStartFret =
		['Guitar', 'Banjo', 'Ukulele', 'Mandolin'].includes(activeInstrument ?? '') ?? false;

	useEffect(() => {
		const newNote = getNote(item.tonic, usingFlats);
		const newSymbol = getChordSymbol(item.variant, showNerdMode);
		const newComputedChordName = item.variant === 'major' ? newNote : `${newNote}${newSymbol}`;
		const newChordName = item.name ?? newComputedChordName;
		// Don't reset if we just saved this exact value
		if (justSavedRef.current === newChordName) {
			justSavedRef.current = null;
			return;
		}
		setInputValue(newChordName);
	}, [item.tonic, item.variant, item.name, usingFlats, showNerdMode]);

	if (!activeInstrument) {
		return null;
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
	};

	const handleBlur = () => {
		const parsed = parseChordName(inputValue, usingFlats);
		// Mark that we're saving this value to prevent useEffect from resetting it
		justSavedRef.current = inputValue;
		if (parsed.tonic !== null && isValidNoteIndex(parsed.tonic) && parsed.variant !== null) {
			// If the input can be parsed as a valid chord, update the chord data and save the input as custom name
			updateChordBinItem(item.id, {
				tonic: parsed.tonic,
				variant: parsed.variant,
				name: inputValue,
			});
		} else {
			// If the input cannot be parsed, save it as a custom name
			updateChordBinItem(item.id, {
				name: inputValue,
			});
		}
	};

	const renderEditor = (instrument: InstrumentType) => {
		switch (instrument) {
			case 'Piano':
				return <PianoEditor item={item} />;
			case 'Guitar':
				return <GuitarEditor item={item} />;
			case 'Banjo':
				return <BanjoEditor item={item} />;
			case 'Ukulele':
				return <UkuleleEditor item={item} />;
			case 'Mandolin':
				return <MandolinEditor item={item} />;
			default:
				return null;
		}
	};

	return (
		<div
			className='ChordBinEditor absolute flex flex-col gap-4 bg-white inset-4 p-4 border shadow-xl z-10'
			ref={editorRef}
		>
			<CloseButton onFxn={onClose} containerRef={editorRef} />
			<h2 className='flex items-center justify-center gap-2 text-2xl font-bold text-center'>
				<span>Chord Editor</span>
				<InstrumentIcon name={activeInstrument} size='md' />
			</h2>

			<input
				type='search'
				className='border border-transparent w-full text-center p-2 hover:border-black focus:border-black'
				value={inputValue}
				onChange={handleChange}
				onBlur={handleBlur}
			/>

			{showStartFret && <StartFret />}

			{renderEditor(activeInstrument)}
		</div>
	);
}
