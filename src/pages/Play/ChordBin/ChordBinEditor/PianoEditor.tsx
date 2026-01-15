import type { ChordBinItemData } from '@/types';

type PianoEditorProps = {
	item: ChordBinItemData;
};

export function PianoEditor({ item }: PianoEditorProps) {
	return <div className='PianoEditor'>Piano Editor Content</div>;
}
