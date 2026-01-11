import { Main } from '@/components/Main';
import { Title } from '@/components/Title';
import { TopButton, UseFlatsButton } from '@/components/buttons';
import { Displays, DisplaysSelector } from '@/components/displays';
import { NavIcon } from '@/components/icons';
import { useChords, useGlobals, usePlay, useScales } from '@/hooks';
import { ChordBin, Notepad, SaveSection } from './';

export function Play() {
	const title = 'Play';
	const { displays, handleDisplaysClick } = useGlobals();
	const { referenceMode, toggleReferenceMode } = usePlay();

	const chordsData = useChords();
	const scalesData = useScales();

	const isScalesMode = referenceMode === 'Scales';
	const data = isScalesMode ? scalesData : chordsData;

	const referenceModeButtonTitle = isScalesMode ? 'Show Chords?' : 'Show Scales?';

	return (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				icon={<NavIcon name={referenceMode} size='sm' />}
				position='left'
				title={referenceModeButtonTitle}
				onFxn={toggleReferenceMode}
			/>
			<UseFlatsButton />

			<DisplaysSelector onFxn={handleDisplaysClick} displays={displays} hasModes={isScalesMode} />
			<Displays
				hasModes={isScalesMode}
				notes={data.notes}
				tonic={data.tonic}
				showNoteLabels={isScalesMode ? scalesData.showNoteLabels : undefined}
				getBorderStyle={isScalesMode ? undefined : chordsData.getBorderStyle}
				showNerdMode={isScalesMode ? undefined : chordsData.showNerdMode}
			/>

			<hr className='border-b border-black py-px' />

			<ChordBin />

			<Notepad />

			<SaveSection />
		</Main>
	);
}
