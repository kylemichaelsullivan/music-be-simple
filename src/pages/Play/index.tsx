import Main from '@/components/Main';
import Title from '@/components/Title';
// import TopButton from '@/components/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';
import Displays from '@/components/displays/Displays';
import DisplaysSelector from '@/components/displays/DisplaysSelector';
import { useGlobals } from '@/hooks';
import type { NoteIndex } from '@/types';

export default function PlayIndex() {
	const title = 'Play';
	// Play route doesn't have notes/tonic, so use empty arrays
	const notes: NoteIndex[] = [];
	const tonic: NoteIndex = 0;
	const { displays, handleDisplaysClick } = useGlobals();

	return (
		<Main componentName={title}>
			<Title title={title} />
			{
				/* <TopButton title={title} icon='📖' position='left' onFxn={() => {}} /> */
				<UseFlatsButton />
			}

			<DisplaysSelector onFxn={handleDisplaysClick} displays={displays} />
			<Displays notes={notes} tonic={tonic} getBorderStyle={() => 'none'} />
		</Main>
	);
}
