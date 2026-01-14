import { Main } from '@/components/Main';
import { SkipLink } from '@/components/SkipLink';
import { Title } from '@/components/Title';
import { Tonic } from '@/components/Tonic';
import { Variant } from '@/components/Variant';
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
				title={referenceModeButtonTitle}
				position='left'
				onFxn={toggleReferenceMode}
			/>
			<UseFlatsButton />

			<SkipLink text='Skip tonic/variant' targetSelector='.DisplaysSelector' />
			<div
				className={`${isScalesMode ? 'Scale' : 'Chord'} flex justify-center ${isScalesMode ? '' : 'align-center'} gap-1 w-full ${isScalesMode ? '' : 'mx-auto'}`}
			>
				<Tonic tonic={data.tonic} handleTonicChange={data.handleTonicChange} />
				<Variant type={isScalesMode ? 'scale' : 'chord'} />
			</div>

			<SkipLink text='Skip displays selector' targetSelector='.Displays' />
			<DisplaysSelector onFxn={handleDisplaysClick} displays={displays} hasModes={isScalesMode} />

			<Displays
				notes={data.notes}
				tonic={data.tonic}
				getBorderStyle={isScalesMode ? undefined : chordsData.getBorderStyle}
				showNerdMode={isScalesMode ? undefined : chordsData.showNerdMode}
				showNoteLabels={isScalesMode ? scalesData.showNoteLabels : undefined}
				hasModes={isScalesMode}
			/>

			<hr className='border-b border-black py-px' />

			<ChordBin />

			<Notepad />

			<SaveSection />
		</Main>
	);
}
