import { Main, MainBody } from '@/components';
import { MainHead } from '@/components/MainHead';
import type { PageLayoutProps } from '@/types';

export function PageLayout({
	displaysProps,
	title,
	titleActionLabel,
	titleTooltip,
	tonicVariantSlot,
	topButton,
	afterDisplaysSlot,
	notesSlot,
	onTitleClick,
}: PageLayoutProps) {
	const content = (
		<Main componentName={title}>
			<MainHead
				title={title}
				titleActionLabel={titleActionLabel}
				titleTooltip={titleTooltip}
				topButton={topButton}
				tonicVariantSlot={tonicVariantSlot}
				notesSlot={notesSlot}
				onTitleClick={onTitleClick}
			/>

			<MainBody displaysProps={displaysProps} afterDisplaysSlot={afterDisplaysSlot} />
		</Main>
	);

	return content;
}
