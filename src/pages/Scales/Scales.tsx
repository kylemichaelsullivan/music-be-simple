import { useCallback, useState } from 'react';
import { PageLayout, RandomPickConfirmModal } from '@/components';
import { useLocalStorage } from '@/context/shared';
import { useScales } from '@/hooks';
import { ScaleRandomTierIdSchema } from '@/schemas';
import type { ScaleRandomTierId } from '@/utils';
import {
	applyScaleRandomTier,
	DEFAULT_SCALE_RANDOM_TIER,
	SCALE_RANDOM_TIER_OPTIONS,
} from '@/utils';
import { Notes, ScaleContainer } from '.';

export function Scales() {
	const {
		makeScale,
		notes,
		tonic,
		variant,
		showModes,
		showNoteLabels,
		noteLabelsButtonIcon,
		noteLabelsButtonTitle,
		toggleNoteLabels,
	} = useScales();

	const [tierPreference, setTierPreference] = useLocalStorage(
		'randomScaleTier',
		ScaleRandomTierIdSchema,
		DEFAULT_SCALE_RANDOM_TIER
	);

	const [randomModalOpen, setRandomModalOpen] = useState(false);
	const [draftTier, setDraftTier] = useState<ScaleRandomTierId>(tierPreference);

	const openRandomModal = useCallback(() => {
		setDraftTier(tierPreference);
		setRandomModalOpen(true);
	}, [tierPreference]);

	const confirmRandomScale = useCallback(() => {
		applyScaleRandomTier(draftTier, { makeScale, tonic, variant });
		setTierPreference(draftTier);
	}, [draftTier, makeScale, setTierPreference, tonic, variant]);

	return (
		<>
			<PageLayout
				title='Scales'
				titleActionLabel='Random Scale?'
				titleTooltip='Random Scale? This device remembers your last randomness choice.'
				topButton={{
					icon: noteLabelsButtonIcon,
					title: noteLabelsButtonTitle,
					onFxn: toggleNoteLabels,
				}}
				tonicVariantSlot={<ScaleContainer />}
				notesSlot={<Notes />}
				displaysProps={{ notes, tonic, showModes, showNoteLabels }}
				onTitleClick={openRandomModal}
			/>
			{randomModalOpen ? (
				<RandomPickConfirmModal
					aria-labelledby='random-pick-scales-title'
					fieldsetLegend='How random?'
					heading='Random Scale?'
					selectedTierId={draftTier}
					options={SCALE_RANDOM_TIER_OPTIONS}
					onClose={() => setRandomModalOpen(false)}
					onConfirm={confirmRandomScale}
					onTierChange={setDraftTier}
				/>
			) : null}
		</>
	);
}
