import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useButtonHandler } from '@/hooks';
import type { PositionType } from '@/types';
import arrowIcon from '/icons/arrow.svg';

export type DisplaysSelectorMoveDirection = PositionType;

type DisplaysSelectorMoveButtonProps = {
	direction: DisplaysSelectorMoveDirection;
	disabled?: boolean;
	onFxn: () => void;
	className?: string;
};

/** `arrow.svg` points right; rotate for other directions. */
const ARROW_ROTATE_CLASS: Record<DisplaysSelectorMoveDirection, string> = {
	top: '-rotate-90',
	right: 'rotate-0',
	bottom: 'rotate-90',
	left: 'rotate-180',
};

/** Placement in the parent 3×3 grid (cross layout). */
const GRID_PLACEMENT: Record<DisplaysSelectorMoveDirection, string> = {
	top: 'col-start-2 row-start-1',
	left: 'col-start-1 row-start-2',
	right: 'col-start-3 row-start-2',
	bottom: 'col-start-2 row-start-3',
};

export function DisplaysSelectorMoveButton({
	direction,
	disabled = false,
	onFxn,
	className,
}: DisplaysSelectorMoveButtonProps) {
	const Direction = direction.charAt(0).toUpperCase() + direction.slice(1);
	const title = disabled ? `${Direction} (current)` : `Move ${Direction}`;
	const ariaLabel = disabled
		? `Displays selector is on the ${direction} (current position)`
		: `Move ${Direction}`;

	const { handleClick, handleKeyDown } = useButtonHandler(onFxn);

	return (
		<button
			type='button'
			disabled={disabled}
			className={clsx(
				'DisplaysSelectorMoveButton flex items-center justify-center bg-slate-200 border border-slate-500 text-sm w-8 h-8 hover:ring-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:ring-0',
				GRID_PLACEMENT[direction],
				className
			)}
			title={title}
			aria-label={ariaLabel}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<Icon
				src={arrowIcon}
				className={clsx(ARROW_ROTATE_CLASS[direction])}
				size='xs'
				alt={Direction}
			/>
		</button>
	);
}
