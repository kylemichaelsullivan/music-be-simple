import { useCallback, useState } from 'react';
import { PageLayout, RandomPickConfirmModal } from '@/components';
import { useLocalStorage } from '@/context/shared';
import { useChords } from '@/hooks';
import { ChordRandomTierIdSchema } from '@/schemas';
import type { ChordRandomTierId } from '@/utils';
import {
	applyChordRandomTier,
	CHORD_RANDOM_TIER_OPTIONS,
	DEFAULT_CHORD_RANDOM_TIER,
} from '@/utils';
import { Chord, Notes } from '.';

export function Chords() {
	const {
		makeScale,
		notes,
		tonic,
		variant,
		nerdModeButtonIcon,
		nerdModeButtonTitle,
		pianoNotes,
		showNerdMode,
		getBorderStyle,
		toggleNerdMode,
	} = useChords();

	const [tierPreference, setTierPreference] = useLocalStorage(
		'randomChordTier',
		ChordRandomTierIdSchema,
		DEFAULT_CHORD_RANDOM_TIER
	);

	const [randomModalOpen, setRandomModalOpen] = useState(false);
	const [draftTier, setDraftTier] = useState<ChordRandomTierId>(tierPreference);

	const openRandomModal = useCallback(() => {
		setDraftTier(tierPreference);
		setRandomModalOpen(true);
	}, [tierPreference]);

	const confirmRandomChord = useCallback(() => {
		applyChordRandomTier(draftTier, { makeScale, tonic, variant });
		setTierPreference(draftTier);
	}, [draftTier, makeScale, setTierPreference, tonic, variant]);

	return (
		<>
			<PageLayout
				title='Chords'
				titleActionLabel='Random Chord?'
				titleTooltip='Random Chord? This device remembers your last randomness choice.'
				topButton={{
					icon: nerdModeButtonIcon,
					title: nerdModeButtonTitle,
					onFxn: toggleNerdMode,
				}}
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
				onTitleClick={openRandomModal}
			/>
			{randomModalOpen ? (
				<RandomPickConfirmModal
					aria-labelledby='random-pick-chords-title'
					fieldsetLegend='How random?'
					heading='Random Chord?'
					options={CHORD_RANDOM_TIER_OPTIONS}
					selectedTierId={draftTier}
					onClose={() => setRandomModalOpen(false)}
					onConfirm={confirmRandomChord}
					onTierChange={setDraftTier}
				/>
			) : null}
		</>
	);
}
