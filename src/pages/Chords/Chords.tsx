import { useCallback, useState } from 'react';
import { PageLayout, RandomPickConfirmModal } from '@/components';
import { useChords } from '@/hooks';
import { ALL_CHORD_VARIANTS, randomNoteIndex, randomPick } from '@/utils';
import { Chord, Notes } from '.';

export function Chords() {
	const {
		makeScale,
		notes,
		tonic,
		nerdModeButtonIcon,
		nerdModeButtonTitle,
		pianoNotes,
		showNerdMode,
		getBorderStyle,
		toggleNerdMode,
	} = useChords();

	const [randomModalOpen, setRandomModalOpen] = useState(false);

	const applyRandomChord = useCallback(() => {
		makeScale(randomNoteIndex(), randomPick(ALL_CHORD_VARIANTS));
	}, [makeScale]);

	return (
		<>
			<PageLayout
				title='Chords'
				titleActionLabel='Pick a Random Chord'
				topButton={{
					icon: nerdModeButtonIcon,
					title: nerdModeButtonTitle,
					onFxn: toggleNerdMode,
				}}
				onTitleClick={() => setRandomModalOpen(true)}
				tonicVariantSlot={<Chord />}
				notesSlot={<Notes />}
				displaysProps={{
					pianoNotes,
					notes,
					tonic,
					getBorderStyle,
					hideModesAndCircle: true,
					showNerdMode,
				}}
			/>
			{randomModalOpen ? (
				<RandomPickConfirmModal
					heading='Pick a Random Chord?'
					description='Your current tonic and chord type will be replaced.'
					aria-labelledby='random-pick-chords-title'
					onClose={() => setRandomModalOpen(false)}
					onConfirm={applyRandomChord}
				/>
			) : null}
		</>
	);
}
