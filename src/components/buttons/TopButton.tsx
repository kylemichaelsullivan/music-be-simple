import { useButtonHandler } from '@/hooks/useButtonHandler';
import type { XPositionType } from '@/types';

type TopButtonProps = {
	title: string;
	icon: string;
	position: XPositionType;
	onFxn: () => void;
};

export default function TopButton({ title, icon, position, onFxn }: TopButtonProps) {
	const ComponentTitle = title.replace(' ', '-');
	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);

	return (
		<button
			type='button'
			className={`${ComponentTitle} absolute bg-slate-200 border border-slate-500 text-xl w-12 h-12 top-0 ${position}-0 hover:ring-1`}
			title={title}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{icon}
		</button>
	);
}
