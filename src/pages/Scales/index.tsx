import Main from '@/components/Main';
import Title from '@/components/Title';
import TopButton from '@/components/buttons/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';
import Displays from '@/components/displays/Displays';
import DisplaysSelector from '@/components/displays/DisplaysSelector';
import { useGlobals } from '@/hooks/useGlobals';
import { useScales } from '@/hooks/useScales';
import type { IconType } from '@/instruments';

export default function Scales() {
	const title = 'Scales';
	const { displays, handleDisplaysClick } = useGlobals();
	const { showNoteLabels, toggleNoteLabels } = useScales();

	return (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				title={showNoteLabels ? 'Hide Notes?' : 'Show Notes?'}
				icon={showNoteLabels ? '📖' : '📕'}
				position='left'
				onFxn={toggleNoteLabels}
			/>
			<UseFlatsButton />

			<p>Selects</p>

			<p>Notes</p>

			<DisplaysSelector
				onFxn={(icon: IconType) => handleDisplaysClick(icon)}
				displays={displays}
				hasModes
			/>
			<Displays hasModes />
		</Main>
	);
}
