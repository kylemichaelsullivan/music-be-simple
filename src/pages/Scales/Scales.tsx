import { Main } from '@/components/Main';
import { SkipLink } from '@/components/SkipLink';
import { Title } from '@/components/Title';
import { TopButton, UseFlatsButton } from '@/components/buttons';
import { Displays, DisplaysSelector } from '@/components/displays';
import { useGlobals, useScales } from '@/hooks';
import type { IconType } from '@/instruments';
import { Notes, ScaleContainer } from './';

export function Scales() {
	const title = 'Scales';
	const { displays, handleDisplaysClick } = useGlobals();
	const {
		notes,
		tonic,
		showNoteLabels,
		noteLabelsButtonIcon,
		noteLabelsButtonTitle,
		toggleNoteLabels,
	} = useScales();

	return (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				icon={noteLabelsButtonIcon}
				title={noteLabelsButtonTitle}
				position='left'
				onFxn={toggleNoteLabels}
			/>
			<UseFlatsButton />

			<SkipLink text='Skip tonic/variant' targetSelector='.DisplaysSelector' />
			<ScaleContainer />
			<Notes />

			<SkipLink text='Skip displays selector' targetSelector='.Displays' />
			<DisplaysSelector
				displays={displays}
				hasModes
				onFxn={(icon: IconType) => handleDisplaysClick(icon)}
			/>

			<Displays hasModes notes={notes} showNoteLabels={showNoteLabels} tonic={tonic} />
		</Main>
	);
}
