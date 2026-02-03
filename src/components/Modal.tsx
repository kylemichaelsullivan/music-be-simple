import { CloseButton } from '@/components/buttons';
import { type ReactNode, useEffect, useRef } from 'react';

type ModalProps = {
	'aria-labelledby'?: string;
	children: ReactNode;
	dialogClassName?: string;
	onClose: () => void;
};

const DIALOG_BASE =
	'fixed flex justify-center items-center bg-black/40 border-0 w-full h-full p-4 inset-0 z-50';
const CONTAINER =
	'relative flex flex-col gap-4 bg-white border rounded-lg shadow-xl max-h-[calc(100vh-2rem)] p-4 overflow-y-auto sm:min-w-80';

export function Modal({
	'aria-labelledby': ariaLabelledBy,
	children,
	dialogClassName,
	onClose,
}: ModalProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		dialogRef.current?.focus();
	}, []);

	return (
		<dialog
			aria-labelledby={ariaLabelledBy}
			aria-modal
			className={dialogClassName ? `${DIALOG_BASE} ${dialogClassName}` : DIALOG_BASE}
			open
			ref={dialogRef}
			tabIndex={-1}
		>
			<div className={CONTAINER} ref={containerRef}>
				<CloseButton onFxn={onClose} containerRef={containerRef} />
				{children}
			</div>
		</dialog>
	);
}
