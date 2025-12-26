import Main from '@/components/Main';
import TopButton from '@/components/TopButton';

export default function Scales() {
	const title = 'Scales';

	return (
		<Main componentName={title}>
			<h1>{title}</h1>
			<TopButton title={title} icon='📖' position='left' onFxn={() => {}} />
			<TopButton title={title} icon='📖' position='right' onFxn={() => {}} />
		</Main>
	);
}
