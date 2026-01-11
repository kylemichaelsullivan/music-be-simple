import { EditButton, RemoveButton } from '@/components/buttons';
import { useChords, useGlobals } from '@/hooks';
import type { ChordBinItemData } from '@/types';
import { getChordSymbol, getNote } from '@/utils';

type ChordBinItemProps = {
	item: ChordBinItemData;
	onRemove: () => void;
};

export function ChordBinItem({ item, onRemove }: ChordBinItemProps) {
	const { usingFlats } = useGlobals();
	const { showNerdMode } = useChords();
	const ID = item.id.toString();

	const note = getNote(item.tonic, usingFlats);
	const symbol = getChordSymbol(item.variant, showNerdMode);
	const chordName = item.variant === 'major' ? note : `${note}${symbol}`;

	const onEdit = () => {
		console.log('edit', chordName);
	};

	return (
		<div
			className='ChordBinItem relative flex justify-center items-start border border-lg p-2'
			id={`chord-bin-item-${ID}`}
		>
			<EditButton title={`Edit ${chordName}`} onFxn={onEdit} />
			<span className='text-sm'>{chordName}</span>
			<RemoveButton title={`Remove ${chordName}`} onFxn={onRemove} />
		</div>
	);
}
