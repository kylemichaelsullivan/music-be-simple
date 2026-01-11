import { RemoveButton } from '@/components/buttons';
import type { NotepadLineData } from '@/types';

type NotepadLineProps = {
	line: NotepadLineData;
	onRemove: () => void;
};

export function NotepadLine({ onRemove, line }: NotepadLineProps) {
	const ID = line.id.toString();

	return (
		<div
			className='NotepadLine relative flex justify-start items-center gap-2 border border-lg p-2'
			id={`notepad-line-${ID}`}
		>
			<RemoveButton title={`Remove Notepad Line ${ID}`} onFxn={onRemove} />
			<span className='text-sm'>{line.content || `Notepad Line ${ID}`}</span>
		</div>
	);
}
