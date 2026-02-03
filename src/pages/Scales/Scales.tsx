import { PageLayout } from '@/components/PageLayout';
import { useScales } from '@/hooks';
import { Notes, ScaleContainer } from '.';

export function Scales() {
	const {
		notes,
		tonic,
		showModes,
		showNoteLabels,
		noteLabelsButtonIcon,
		noteLabelsButtonTitle,
		toggleNoteLabels,
	} = useScales();

	return (
		<PageLayout
			title='Scales'
			topButton={{
				icon: noteLabelsButtonIcon,
				title: noteLabelsButtonTitle,
				onFxn: toggleNoteLabels,
			}}
			tonicVariantSlot={<ScaleContainer />}
			notesSlot={<Notes />}
			hasModes
			displaysProps={{ notes, tonic, showModes, showNoteLabels }}
		/>
	);
}
