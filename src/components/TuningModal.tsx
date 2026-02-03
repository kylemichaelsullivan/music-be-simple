import { Modal } from '@/components/Modal';
import { InstrumentIcon } from '@/components/icons';
import { useGlobals, useTunings } from '@/hooks';
import type { NoteIndex, TunableInstrument } from '@/types';
import { getNote, isValidNoteIndex } from '@/utils';
import type { ChangeEvent } from 'react';

const NOTE_OPTIONS: readonly NoteIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const STRING_LABELS: Record<TunableInstrument, string[]> = {
	Banjo: ['String 1', 'String 2', 'String 3', 'String 4', 'Drone'],
	Guitar: ['String 1', 'String 2', 'String 3', 'String 4', 'String 5', 'String 6'],
	Mandolin: ['String 1', 'String 2', 'String 3', 'String 4'],
	Ukulele: ['String 1', 'String 2', 'String 3', 'String 4'],
};

type TuningModalProps = {
	instrument: TunableInstrument;
};

export function TuningModal({ instrument }: TuningModalProps) {
	const { usingFlats } = useGlobals();
	const { closeTuningModal, getTuning, resetTuning, setTuning } = useTunings();

	const notes = getTuning(instrument);
	const labels = STRING_LABELS[instrument];

	const handleChange = (stringIndex: number) => (e: ChangeEvent<HTMLSelectElement>) => {
		const value = Number.parseInt(e.target.value, 10);
		if (!Number.isNaN(value) && isValidNoteIndex(value)) {
			const next: NoteIndex[] = [...notes];
			next[stringIndex] = value;
			setTuning(instrument, next);
		}
	};

	const handleReset = () => {
		if (window.confirm('Reset this instrument’s tuning to default?')) {
			resetTuning(instrument);
		}
	};

	return (
		<Modal
			aria-labelledby='tuning-modal-title'
			dialogClassName='TuningModal'
			onClose={closeTuningModal}
		>
			<h2
				className='flex items-center justify-center gap-2 text-xl font-bold pr-6'
				id='tuning-modal-title'
			>
				<span>Edit Tuning</span>
				<InstrumentIcon name={instrument} size='md' />
			</h2>
			<div className='flex flex-col gap-3'>
				{labels.map((label, i) => (
					<label className='flex items-center gap-3' key={`${instrument}-${label}`}>
						<span className='text-sm w-24'>{label}</span>
						<select
							className='flex-1 border border-gray-300 rounded px-2 py-1'
							value={notes[i]}
							onChange={handleChange(i)}
						>
							{NOTE_OPTIONS.map((n) => (
								<option value={n} key={n}>
									{getNote(n, usingFlats)}
								</option>
							))}
						</select>
					</label>
				))}
			</div>
			<button
				type='button'
				className='self-center bg-gray-100 border border-gray-300 rounded text-sm px-3 py-1 hover:bg-gray-200'
				onClick={handleReset}
			>
				Reset to Default
			</button>
		</Modal>
	);
}
