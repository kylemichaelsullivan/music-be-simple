import Main from '@/components/Main';
import Title from '@/components/Title';
// import TopButton from '@/components/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';

export default function Play() {
	const title = 'Play';

	return (
		<Main componentName={title}>
			<Title title={title} />
			{
				/* <TopButton title={title} icon='📖' position='left' onFxn={() => {}} /> */
				<UseFlatsButton />
			}
		</Main>
	);
}
