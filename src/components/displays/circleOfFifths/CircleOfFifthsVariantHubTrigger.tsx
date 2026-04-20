import type { KeyboardEvent } from 'react';
import { memo } from 'react';
import { CIRCLE_OF_FIFTHS_VARIANT_HUB_TEXT_SIZE } from './CircleOfFifthsVariantHub.constants';

type CircleOfFifthsVariantHubTriggerProps = {
	variantDisplay: string;
	onOpen: () => void;
};

function CircleOfFifthsVariantHubTriggerComponent({
	variantDisplay,
	onOpen,
}: CircleOfFifthsVariantHubTriggerProps) {
	return (
		<button
			type='button'
			className={`CircleOfFifthsVariantHubTrigger block cursor-default bg-transparent rounded-md w-full min-w-0 max-w-full px-2 py-0.5 text-center font-serif font-semibold ${CIRCLE_OF_FIFTHS_VARIANT_HUB_TEXT_SIZE} leading-tight text-slate-900 [@media(hover:hover)]:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-700`}
			aria-haspopup='listbox'
			aria-expanded={false}
			aria-label={`Change scale variant (currently ${variantDisplay})`}
			onClick={onOpen}
			onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onOpen();
				}
			}}
		>
			<span className='block w-full min-w-0 whitespace-normal wrap-break-word px-1'>
				{variantDisplay}
			</span>
		</button>
	);
}

export const CircleOfFifthsVariantHubTrigger = memo(CircleOfFifthsVariantHubTriggerComponent);
