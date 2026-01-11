import { Main } from '@/components/Main';
import { Title } from '@/components/Title';
import { TopButton, UseFlatsButton } from '@/components/buttons';
import { Displays, DisplaysSelector } from '@/components/displays';
import { useChords, useGlobals } from '@/hooks';
import { Chord, Notes } from './';

export function Chords() {
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
