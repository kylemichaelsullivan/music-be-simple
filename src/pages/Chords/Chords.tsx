import { Main } from '@/components/Main';
import { SkipLink } from '@/components/SkipLink';
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
		nerdModeButtonIcon,
		nerdModeButtonTitle,
		showNerdMode,
		toggleNerdMode,
	} = useChords();

	return (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				icon={nerdModeButtonIcon}
				title={nerdModeButtonTitle}
				position='left'
				onFxn={toggleNerdMode}
			/>
			<UseFlatsButton />

			<SkipLink text='Skip tonic/variant' targetSelector='.DisplaysSelector' />
			<Chord />
			<Notes />

			<SkipLink text='Skip displays selector' targetSelector='.Displays' />
			<DisplaysSelector displays={displays} onFxn={handleDisplaysClick} />

			<Displays
				tonic={tonic}
				notes={notes}
				getBorderStyle={getBorderStyle}
				showNerdMode={showNerdMode}
			/>
		</Main>
	);
}
