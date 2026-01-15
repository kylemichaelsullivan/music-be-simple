import type { ChordBinItemData } from '@/types';

type MandolinEditorProps = {
	item: ChordBinItemData;
};

export function MandolinEditor({ item }: MandolinEditorProps) {
	return <div className='MandolinEditor'>Mandolin Editor Content</div>;
}
