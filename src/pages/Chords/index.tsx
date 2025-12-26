import Main from '@/components/Main';
import TopButton from '@/components/TopButton';

export default function Chords() {
	const title = 'Chords';

	return (
		<Main componentName={title}>
			<h1>{title}</h1>
			<TopButton title='Left' icon='📖' position='left' onFxn={() => {}} />
			<TopButton title='Right' icon='📖' position='right' onFxn={() => {}} />
		</Main>
	);
}
