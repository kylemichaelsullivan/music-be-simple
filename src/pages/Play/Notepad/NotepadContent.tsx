import type { NotepadItemData, NotepadLineData, NotepadLineSupports } from '@/types';
import clsx from 'clsx';
import {
	AddNotepadLine,
	NotepadLine,
	NotepadLineChordsOnly,
	NotepadLineLyricsOnly,
	NotepadLineTitle,
} from '.';

type NotepadContentProps = {
	notepadItems: NotepadItemData[];
	isOver: boolean;
	dropRef: (node: HTMLElement | null) => void;
	onAddTitle: () => void;
	onAddLine: () => void;
	onAddLineChords: () => void;
	onAddLineLyrics: () => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
	onRemoveItem: (id: number) => void;
};

function notepadLineSupports(line: NotepadLineData): NotepadLineSupports {
	const supports = line.supports ?? { chords: true, lyrics: true };
	return {
		chords: supports.chords ?? true,
		lyrics: supports.lyrics ?? true,
	};
}

export function NotepadContent({
	notepadItems,
	isOver,
	dropRef,
	onAddTitle,
	onAddLine,
	onAddLineChords,
	onAddLineLyrics,
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
						) : (() => {
								const line = item as NotepadLineData;
								const supports = notepadLineSupports(line);
								if (supports.chords && !supports.lyrics) {
									return (
										<NotepadLineChordsOnly
											line={line}
											index={index}
											onReorder={onReorder}
											onRemove={() => onRemoveItem(item.id)}
											key={item.id}
										/>
									);
								}
								if (!supports.chords && supports.lyrics) {
									return (
										<NotepadLineLyricsOnly
											line={line}
											index={index}
											onReorder={onReorder}
											onRemove={() => onRemoveItem(item.id)}
											key={item.id}
										/>
									);
								}
								return (
									<NotepadLine
										line={line}
										index={index}
										onReorder={onReorder}
										onRemove={() => onRemoveItem(item.id)}
										key={item.id}
									/>
								);
							})()
					)
				) : (
					<span className='text-sm italic text-center'>add a line or title</span>
				)}
			</div>

			<AddNotepadLine
				onAddTitle={onAddTitle}
				onAddLine={onAddLine}
				onAddLineChords={onAddLineChords}
				onAddLineLyrics={onAddLineLyrics}
			/>
		</>
	);
}
