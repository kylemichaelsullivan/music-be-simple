import { TopButton, UseFlatsButton } from '@/components/buttons';
import { SkipLink } from '@/components/SkipLink';
import { Title } from '@/components/Title';
import type { MainHeadProps } from '@/types';

export function MainHead({
	title,
	titleActionLabel,
	titleTooltip,
	topButton,
	tonicVariantSlot,
	notesSlot,
	onTitleClick,
}: MainHeadProps) {
	return (
		<div className='MainHead flex flex-col gap-4'>
			<Title
				actionLabel={titleActionLabel}
				title={title}
				tooltip={titleTooltip}
				onTitleClick={onTitleClick}
			/>
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
		</div>
	);
}
