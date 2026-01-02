import Main from '@/components/Main';
import Title from '@/components/Title';
import TopButton from '@/components/buttons/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';
import Displays from '@/components/displays/Displays';
import DisplaysSelector from '@/components/displays/DisplaysSelector';
import { useGlobals, useScales } from '@/hooks';
import type { IconType } from '@/instruments';
import Notes from './Notes';
import ScaleContainer from './ScaleContainer';

export default function ScalesIndex() {
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
