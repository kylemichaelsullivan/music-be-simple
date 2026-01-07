import { usePlay } from '@/hooks';
import type { SaveActionType } from '@/types';
import SaveSectionButtons from './SaveSectionButtons';

export default function Exports() {
	const { exportChordBin, exportNotepad, exportAll } = usePlay();

	const saves = {
		'Chord Bin': exportChordBin,
		Notepad: exportNotepad,
		All: exportAll,
	};

	const action: SaveActionType = 'Export';

	return (
		<div className='Exports flex flex-col flex-1 gap-4'>
			<h3 className='text-xl font-semibold text-center'>Export</h3>
			<SaveSectionButtons saves={saves} action={action} />
		</div>
	);
}
