import RemoveButton from '@/components/buttons/RemoveButton';

type NotepadLineProps = {
	id: number;
	onRemove: () => void;
};

export default function NotepadLine({ onRemove, id }: NotepadLineProps) {
	const ID = id.toString();

	return (
		<div
			className='NotepadLine relative flex justify-start items-center gap-2 border border-lg p-2'
			id={`notepad-line-${ID}`}
		>
			<RemoveButton title={`Remove Notepad Line ${ID}`} onFxn={onRemove} />
			<span className='text-sm'>Notepad Line {ID}</span>
		</div>
	);
}
