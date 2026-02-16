import { AddButton } from '@/components/buttons';
import { Modal } from '@/components/Modal';
import { useState } from 'react';

type AddNotepadLineProps = {
	onAddTitle: () => void;
	onAddLine: () => void;
	onAddLineChords: () => void;
	onAddLineLyrics: () => void;
};

export function AddNotepadLine({
	onAddTitle,
	onAddLine,
	onAddLineChords,
	onAddLineLyrics,
}: AddNotepadLineProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [includeChords, setIncludeChords] = useState(true);
	const [includeLyrics, setIncludeLyrics] = useState(true);

	const open = () => {
		setIncludeChords(true);
		setIncludeLyrics(true);
		setIsOpen(true);
	};

	const close = () => setIsOpen(false);

	const addTitleAndClose = () => {
		onAddTitle();
		close();
	};

	const addLineAndClose = () => {
		if (includeChords && includeLyrics) {
			onAddLine();
		} else if (includeChords) {
			onAddLineChords();
		} else {
			onAddLineLyrics();
		}
		close();
	};

	const chordsDisabled = includeChords && !includeLyrics;
	const lyricsDisabled = includeLyrics && !includeChords;

	return (
		<>
			<div className='AddNotepadLine col-span-full flex justify-center'>
				<AddButton title='Add to Notepad' onFxn={open} />
			</div>

			{isOpen && (
				<Modal
					aria-labelledby='add-notepad-modal-title'
					dialogClassName='AddNotepadModal'
					onClose={close}
				>
					<h2 className='text-xl font-bold text-center pr-6' id='add-notepad-modal-title'>
						Add to Notepad
					</h2>
					<div className='flex flex-col gap-4'>
						<button
							type='button'
							className='border border-slate-300 rounded px-4 py-2 text-left hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
							onClick={addTitleAndClose}
						>
							Title
						</button>

						<fieldset className='flex flex-col gap-2 border border-slate-200 rounded px-4 py-3'>
							<legend className='text-sm font-medium text-slate-700'>Line</legend>
							<button
								type='button'
								className='border border-slate-300 rounded px-4 py-2 text-left hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
								onClick={addLineAndClose}
							>
								Add line
							</button>
							<div className='flex flex-col gap-2'>
								<label
									className={`flex items-center gap-2 ${chordsDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
								>
									<input
										type='checkbox'
										checked={includeChords}
										disabled={chordsDisabled}
										onChange={(e) => setIncludeChords(e.target.checked)}
										aria-label='Include chords'
										className='rounded border-slate-300'
									/>
									<span>Chords</span>
								</label>
								<label
									className={`flex items-center gap-2 ${lyricsDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
								>
									<input
										type='checkbox'
										checked={includeLyrics}
										disabled={lyricsDisabled}
										onChange={(e) => setIncludeLyrics(e.target.checked)}
										aria-label='Include lyrics'
										className='rounded border-slate-300'
									/>
									<span>Lyrics</span>
								</label>
							</div>
						</fieldset>
					</div>
				</Modal>
			)}
		</>
	);
}
