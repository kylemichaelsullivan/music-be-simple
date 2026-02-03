import { AddButton } from '@/components/buttons';
import { Modal } from '@/components/Modal';
import { useState } from 'react';

type AddNotepadLineProps = {
	onAddLine: () => void;
	onAddTitle: () => void;
};

export function AddNotepadLine({ onAddLine, onAddTitle }: AddNotepadLineProps) {
	const [isOpen, setIsOpen] = useState(false);

	const open = () => setIsOpen(true);

	const close = () => setIsOpen(false);

	const handleAddLine = () => {
		onAddLine();
		close();
	};

	const handleAddTitle = () => {
		onAddTitle();
		close();
	};

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
					<div className='flex flex-col gap-2'>
						<button
							type='button'
							className='border border-slate-300 rounded px-4 py-2 text-left hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
							onClick={handleAddTitle}
						>
							Title
						</button>

						<button
							type='button'
							className='border border-slate-300 rounded px-4 py-2 text-left hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
							onClick={handleAddLine}
						>
							Line
						</button>
					</div>
				</Modal>
			)}
		</>
	);
}
