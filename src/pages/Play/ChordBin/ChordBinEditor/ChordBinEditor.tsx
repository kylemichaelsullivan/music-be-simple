import { CloseButton } from '@/components/buttons/CloseButton';
import { InstrumentIcon } from '@/components/icons/InstrumentIcon';
import { useChords, useGlobals, usePlay } from '@/hooks';
import type { ChordBinItemData, InstrumentType } from '@/types';
import { getChordSymbol, getNote, isValidNoteIndex, parseChordName } from '@/utils';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { BanjoEditor } from './BanjoEditor';
import { GuitarEditor } from './GuitarEditor';
import { MandolinEditor } from './MandolinEditor';
import { PianoEditor } from './PianoEditor';
import { StartFret } from './StartFret';
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

	const note = getNote(item.tonic, usingFlats);
	const symbol = getChordSymbol(item.variant, showNerdMode);
	const initialChordName = item.variant === 'major' ? note : `${note}${symbol}`;

	const [inputValue, setInputValue] = useState(initialChordName);

	const showStartFret =
		['Guitar', 'Banjo', 'Ukulele', 'Mandolin'].includes(activeInstrument ?? '') ?? false;

	useEffect(() => {
		const newNote = getNote(item.tonic, usingFlats);
		const newSymbol = getChordSymbol(item.variant, showNerdMode);
		const newChordName = item.variant === 'major' ? newNote : `${newNote}${newSymbol}`;
		setInputValue(newChordName);
	}, [item.tonic, item.variant, usingFlats, showNerdMode]);

	if (!activeInstrument) {
		return null;
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
	};

	const handleBlur = () => {
		const parsed = parseChordName(inputValue, usingFlats);
		if (parsed.tonic !== null && isValidNoteIndex(parsed.tonic) && parsed.variant !== null) {
			updateChordBinItem(item.id, {
				tonic: parsed.tonic,
				variant: parsed.variant,
			});
		} else {
			const currentNote = getNote(item.tonic, usingFlats);
			const currentSymbol = getChordSymbol(item.variant, showNerdMode);
			const currentChordName =
				item.variant === 'major' ? currentNote : `${currentNote}${currentSymbol}`;
			setInputValue(currentChordName);
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
