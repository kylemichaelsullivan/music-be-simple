import Main from '@/components/Main';
import Title from '@/components/Title';
import TopButton from '@/components/buttons/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';
import Displays from '@/components/displays/Displays';
import DisplaysSelector from '@/components/displays/DisplaysSelector';
import { useChords, useGlobals } from '@/hooks';
import Chord from './Chord';
import Notes from './Notes';

export default function ChordsIndex() {
	const title = 'Chords';
	const { displays, handleDisplaysClick } = useGlobals();
	const {
		notes,
		tonic,
		getBorderStyle,
		showNerdMode,
		toggleNerdMode,
		nerdModeButtonTitle,
		nerdModeButtonIcon,
	} = useChords();

	return (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				title={nerdModeButtonTitle}
				icon={nerdModeButtonIcon}
				position='left'
				onFxn={toggleNerdMode}
			/>
			<UseFlatsButton />

			<Chord />
			<Notes />

			<DisplaysSelector onFxn={handleDisplaysClick} displays={displays} />
			<Displays
				notes={notes}
				tonic={tonic}
				getBorderStyle={getBorderStyle}
				showNerdMode={showNerdMode}
			/>
		</Main>
	);
}
