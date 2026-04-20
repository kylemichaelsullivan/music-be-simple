import { useEffect, useId, useRef } from 'react';
import { Modal } from '@/components';

export type RandomPickTierOption<T extends string> = {
	description: string;
	label: string;
	id: T;
};

type RandomPickConfirmModalProps<T extends string> = {
	'aria-labelledby': string;
	confirmLabel?: string;
	fieldsetLegend: string;
	heading: string;
	options: readonly RandomPickTierOption<T>[];
	selectedTierId: T;
	onClose: () => void;
	onConfirm: () => void;
	onTierChange: (id: T) => void;
};

export function RandomPickConfirmModal<T extends string>({
	'aria-labelledby': ariaLabelledBy,
	confirmLabel = 'Pick Random',
	fieldsetLegend,
	heading,
	selectedTierId,
	options,
	onClose,
	onConfirm,
	onTierChange,
}: RandomPickConfirmModalProps<T>) {
	const descriptionId = useId();
	const firstRadioRef = useRef<HTMLInputElement>(null);
	const selected = options.find((o) => o.id === selectedTierId);

	useEffect(() => {
		firstRadioRef.current?.focus();
	}, []);

	return (
		<Modal
			dialogClassName='RandomPickConfirmModal'
			aria-labelledby={ariaLabelledBy}
			onClose={onClose}
		>
			<div className='flex flex-col gap-4 w-full max-w-104 sm:w-104 sm:min-w-104 min-h-112'>
				<h2
					className='flex items-center justify-center text-lg font-bold text-center pr-6 min-h-14'
					id={ariaLabelledBy}
				>
					{heading}
				</h2>
				<fieldset
					aria-describedby={descriptionId}
					className='border border-gray-200 rounded-md p-3 flex flex-col gap-2 min-w-0 min-h-50'
				>
					<legend className='text-sm font-semibold px-1'>{fieldsetLegend}</legend>
					<div className='flex flex-col gap-2'>
						{options.map((opt, i) => (
							<label className='flex gap-2 items-start cursor-pointer text-sm' key={opt.id}>
								<input
									type='radio'
									className='mt-1 shrink-0'
									name='random-tier'
									value={opt.id}
									checked={selectedTierId === opt.id}
									onChange={() => {
										onTierChange(opt.id);
									}}
									ref={i === 0 ? firstRadioRef : undefined}
								/>
								<span>{opt.label}</span>
							</label>
						))}
					</div>
				</fieldset>
				<p className='text-sm text-center text-gray-700 min-h-24 px-1' id={descriptionId}>
					{selected?.description}
				</p>
				<div className='flex flex-wrap gap-2 justify-center mt-auto'>
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
			</div>
		</Modal>
	);
}
