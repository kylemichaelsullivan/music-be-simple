import { Main } from '@/components/Main';
import { SkipLink } from '@/components/SkipLink';
import { Title } from '@/components/Title';
import { TopButton, UseFlatsButton } from '@/components/buttons';
import { Displays, DisplaysSelector } from '@/components/displays';
import { useGlobals } from '@/hooks';
import type { PageLayoutProps } from '@/types';

export function PageLayout({
	displaysProps,
	title,
	tonicVariantSlot,
	topButton,
	afterDisplaysSlot,
	hasModes = false,
	notesSlot,
}: PageLayoutProps) {
	const { displays, handleDisplaysClick } = useGlobals();

	const content = (
		<Main componentName={title}>
			<Title title={title} />
			<TopButton
				icon={topButton.icon}
				title={topButton.title}
				position='left'
				onFxn={topButton.onFxn}
			/>
			<UseFlatsButton />

			<SkipLink text='Skip tonic/variant' targetSelector='.DisplaysSelector' />
			{tonicVariantSlot}

			{notesSlot}

			<SkipLink text='Skip displays selector' targetSelector='.Displays' />
			<DisplaysSelector displays={displays} onFxn={handleDisplaysClick} hasModes={hasModes} />
			<Displays {...displaysProps} />

			{afterDisplaysSlot}
		</Main>
	);

	return content;
}
