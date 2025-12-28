import Main from '@/components/Main';
import Title from '@/components/Title';
import TopButton from '@/components/buttons/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';
import Displays from '@/components/displays/Displays';
import DisplaysSelector from '@/components/displays/DisplaysSelector';
import { useGlobals } from '@/hooks/useGlobals';

export default function Chords() {
	const title = 'Chords';
	const { displays, handleDisplaysClick, showNerdMode, toggleShowNerdMode } = useGlobals();

	return (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				title={showNerdMode ? 'Show Jazz Notation?' : 'Show Nerd Notation?'}
				icon={showNerdMode ? '🤓' : '💃🏾'}
				position='left'
				onFxn={toggleShowNerdMode}
			/>
			<UseFlatsButton />

			<p>Selects</p>

			<p>Notes</p>

			<DisplaysSelector onFxn={handleDisplaysClick} displays={displays} />
			<Displays />
		</Main>
	);
}
