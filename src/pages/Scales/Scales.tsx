import { useCallback, useState } from 'react';
import { PageLayout, RandomPickConfirmModal } from '@/components';
import { useScales } from '@/hooks';
import { randomNoteIndex, randomPick, SCALE_TYPES } from '@/utils';
import { Notes, ScaleContainer } from '.';

export function Scales() {
	const {
		makeScale,
		notes,
		tonic,
		showModes,
		showNoteLabels,
		noteLabelsButtonIcon,
		noteLabelsButtonTitle,
		toggleNoteLabels,
	} = useScales();

	const [randomModalOpen, setRandomModalOpen] = useState(false);

	const applyRandomScale = useCallback(() => {
		makeScale(randomNoteIndex(), randomPick(SCALE_TYPES));
	}, [makeScale]);

	return (
		<>
			<PageLayout
				onTitleClick={() => setRandomModalOpen(true)}
				title='Scales'
				titleActionLabel='Pick a Random Scale'
				topButton={{
					icon: noteLabelsButtonIcon,
					title: noteLabelsButtonTitle,
					onFxn: toggleNoteLabels,
				}}
				tonicVariantSlot={<ScaleContainer />}
				notesSlot={<Notes />}
				displaysProps={{ notes, tonic, showModes, showNoteLabels }}
			/>
			{randomModalOpen ? (
				<RandomPickConfirmModal
					aria-labelledby='random-pick-scales-title'
					description='Your current tonic and scale type will be replaced.'
					heading='Pick a Random Scale?'
					onClose={() => setRandomModalOpen(false)}
					onConfirm={applyRandomScale}
				/>
			) : null}
		</>
	);
}
