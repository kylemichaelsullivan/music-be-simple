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
			className='SaveSectionButton bg-slate-500 border text-white p-2 transition-colors hover:bg-slate-400 hover:ring-1'
			title={title}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<span className='text-sm'>{label}</span>
		</button>
	);
}
