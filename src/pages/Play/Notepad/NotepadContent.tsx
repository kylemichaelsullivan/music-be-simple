import type { NotepadItemData, NotepadLineData } from '@/types';
import clsx from 'clsx';
import { AddNotepadLine, NotepadLine, NotepadLineTitle } from '.';

type NotepadContentProps = {
	notepadItems: NotepadItemData[];
	isOver: boolean;
	dropRef: (node: HTMLElement | null) => void;
	onAddTitle: () => void;
	onAddLine: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
	onRemoveItem: (id: number) => void;
};

export function NotepadContent({
	notepadItems,
	isOver,
	dropRef,
	onAddTitle,
	onAddLine,
	onReorder,
	onRemoveItem,
}: NotepadContentProps) {
	return (
		<>
			<div
				className={clsx(
					'NotepadContent flex flex-col gap-4 w-full max-w-2xl transition-all duration-200',
					{
						'bg-gray-50 rounded-lg p-2': isOver,
					}
				)}
				ref={dropRef}
			>
				{notepadItems.length > 0 ? (
					notepadItems.map((item, index) =>
						'type' in item && item.type === 'title' ? (
							<NotepadLineTitle
								titleItem={item}
								index={index}
								onReorder={onReorder}
								onRemove={() => onRemoveItem(item.id)}
								key={item.id}
							/>
						) : (
							<NotepadLine
								line={item as NotepadLineData}
								index={index}
								onReorder={onReorder}
								onRemove={() => onRemoveItem(item.id)}
								key={item.id}
							/>
						)
					)
				) : (
					<span className='text-sm italic text-center'>add a line or title</span>
				)}
			</div>

			<AddNotepadLine onAddLine={onAddLine} onAddTitle={onAddTitle} />
		</>
	);
}
