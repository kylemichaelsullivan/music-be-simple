import { useButtonHandler } from '@/hooks';
import type { SaveActionType } from '@/types';

type SaveSectionButtonProps = {
	label: string;
	action: SaveActionType;
	onFxn: () => void;
};

export function SaveSectionButton({ label, action, onFxn }: SaveSectionButtonProps) {
	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);
	const title = `${action} ${label}`;

	return (
		<button
			type='button'
			className='SaveSectionButton border p-2 hover:ring-1 transition-colors'
			title={title}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<span className='text-sm'>{label}</span>
		</button>
	);
}
