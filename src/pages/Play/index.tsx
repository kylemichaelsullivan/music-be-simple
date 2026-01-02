import Main from '@/components/Main';
import Title from '@/components/Title';
// import TopButton from '@/components/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';
import Displays from '@/components/displays/Displays';

export default function PlayIndex() {
	const title = 'Play';
	// Play route doesn't have notes/tonic, so use empty arrays
	const notes: number[] = [];
	const tonic = -1;

	return (
		<Main componentName={title}>
			<Title title={title} />
			{
				/* <TopButton title={title} icon='📖' position='left' onFxn={() => {}} /> */
				<UseFlatsButton />
			}
			<Displays notes={notes} tonic={tonic} />
		</Main>
	);
}
