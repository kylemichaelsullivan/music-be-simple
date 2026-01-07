import { useButtonHandler } from '@/hooks/useButtonHandler';
import type { SaveActionType } from '@/types';

type SaveSectionButtonProps = {
	label: string;
	action: SaveActionType;
	onFxn: () => void;
};

export default function SaveSectionButton({ label, action, onFxn }: SaveSectionButtonProps) {
	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);
	const title = `${action} ${label}`;

	return (
		<button
			type='button'
			className='SaveSectionButton border p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
			title={title}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<span className='text-sm'>{label}</span>
		</button>
	);
}
