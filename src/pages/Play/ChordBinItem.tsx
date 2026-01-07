import RemoveButton from '@/components/buttons/RemoveButton';

type ChordBinItemProps = {
	id: number;
	onRemove: () => void;
};

export default function ChordBinItem({ onRemove, id }: ChordBinItemProps) {
	const ID = id.toString();

	return (
		<div className='ChordBinItem relative border border-lg p-2' id={`chord-bin-item-${ID}`}>
			<span className='text-sm'>Chord Bin Item {ID}</span>
			<RemoveButton title={`Remove Chord Bin Item ${ID}`} onFxn={onRemove} />
		</div>
	);
}
