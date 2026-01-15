import type { ChordBinItemData } from '@/types';

type GuitarEditorProps = {
	item: ChordBinItemData;
};

export function GuitarEditor({ item }: GuitarEditorProps) {
	return <div className='GuitarEditor'>Guitar Editor Content</div>;
}
