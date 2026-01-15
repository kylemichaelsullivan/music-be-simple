import type { ChordBinItemData } from '@/types';

type UkuleleEditorProps = {
	item: ChordBinItemData;
};

export function UkuleleEditor({ item }: UkuleleEditorProps) {
	return <div className='UkuleleEditor'>Ukulele Editor Content</div>;
}
