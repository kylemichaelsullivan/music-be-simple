import type { ChordBinItemData } from '@/types';

type BanjoEditorProps = {
	item: ChordBinItemData;
};

export function BanjoEditor({ item: _item }: BanjoEditorProps) {
	return <div className='BanjoEditor'>Banjo Editor Content</div>;
}
