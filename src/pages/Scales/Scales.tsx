import { Main } from '@/components/Main';
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
		toggleNoteLabels,
		noteLabelsButtonTitle,
		noteLabelsButtonIcon,
	} = useScales();

	return (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				title={noteLabelsButtonTitle}
				icon={noteLabelsButtonIcon}
				position='left'
				onFxn={toggleNoteLabels}
			/>
			<UseFlatsButton />

			<ScaleContainer />
			<Notes />

			<DisplaysSelector
				onFxn={(icon: IconType) => handleDisplaysClick(icon)}
				displays={displays}
				hasModes
			/>
			<Displays hasModes notes={notes} tonic={tonic} showNoteLabels={showNoteLabels} />
		</Main>
	);
}
