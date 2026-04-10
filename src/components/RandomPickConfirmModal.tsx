import { Modal } from '@/components';

type RandomPickConfirmModalProps = {
	'aria-labelledby': string;
	confirmLabel?: string;
	description: string;
	heading: string;
	onClose: () => void;
	onConfirm: () => void;
};

export function RandomPickConfirmModal({
	'aria-labelledby': ariaLabelledBy,
	confirmLabel = 'Pick Random',
	description,
	heading,
	onClose,
	onConfirm,
}: RandomPickConfirmModalProps) {
	return (
		<Modal
			aria-labelledby={ariaLabelledBy}
			dialogClassName='RandomPickConfirmModal'
			onClose={onClose}
		>
			<h2
				className='flex items-center justify-center text-lg font-bold text-center pr-6'
				id={ariaLabelledBy}
			>
				{heading}
			</h2>
			<p className='text-sm text-center'>{description}</p>
			<div className='flex flex-wrap gap-2 justify-center'>
				<button
					type='button'
					className='bg-gray-100 border border-gray-300 rounded text-sm px-3 py-1 hover:bg-gray-200'
					onClick={onClose}
				>
					Cancel
				</button>
				<button
					type='button'
					className='bg-slate-700 border border-slate-800 text-white rounded text-sm px-3 py-1 hover:bg-slate-800'
					onClick={() => {
						onConfirm();
						onClose();
					}}
				>
					{confirmLabel}
				</button>
			</div>
		</Modal>
	);
}
