import { AddButton } from '@/components/buttons';

type AddChordBinItemProps = {
	onAdd: () => void;
};

export function AddChordBinItem({ onAdd }: AddChordBinItemProps) {
	return (
		<div className='AddChordBinItem col-span-full flex justify-center'>
			<AddButton title='Add Chord to Bin' onFxn={onAdd} />
		</div>
	);
}
