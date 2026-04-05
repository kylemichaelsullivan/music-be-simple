import { Main, MainBody } from '@/components';
import { MainHead } from '@/components/MainHead';
import type { PageLayoutProps } from '@/types';

export function PageLayout({
	displaysProps,
	title,
	tonicVariantSlot,
	topButton,
	afterDisplaysSlot,
	notesSlot,
}: PageLayoutProps) {
	const content = (
		<Main componentName={title}>
			<MainHead
				title={title}
				topButton={topButton}
				tonicVariantSlot={tonicVariantSlot}
				notesSlot={notesSlot}
			/>

			<MainBody displaysProps={displaysProps} afterDisplaysSlot={afterDisplaysSlot} />
		</Main>
	);

	return content;
}
