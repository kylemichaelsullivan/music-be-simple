import { AddButton } from '@/components/buttons';

type AddNotepadLineProps = {
	onAdd: () => void;
};

export function AddNotepadLine({ onAdd }: AddNotepadLineProps) {
	return (
		<div className='AddNotepadLine col-span-full flex justify-center'>
			<AddButton title='Add Line to Notepad' onFxn={onAdd} />
		</div>
	);
}
