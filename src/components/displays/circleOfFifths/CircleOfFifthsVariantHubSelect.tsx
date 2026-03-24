import { ScaleVariantSelect } from '@/components/Variant';
import type { KeyboardEvent, RefObject } from 'react';
import { memo } from 'react';
import { CIRCLE_OF_FIFTHS_VARIANT_HUB_SELECT_CLASS_NAME } from './CircleOfFifthsVariantHub.constants';

type CircleOfFifthsVariantHubSelectProps = {
	selectRef: RefObject<HTMLSelectElement | null>;
	onAfterVariantChange: () => void;
	onBlur: () => void;
	onFocus: () => void;
};

function CircleOfFifthsVariantHubSelectComponent({
	selectRef,
	onAfterVariantChange,
	onBlur,
	onFocus,
}: CircleOfFifthsVariantHubSelectProps) {
	return (
		<ScaleVariantSelect
			className={CIRCLE_OF_FIFTHS_VARIANT_HUB_SELECT_CLASS_NAME}
			onAfterVariantChange={onAfterVariantChange}
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={(e: KeyboardEvent<HTMLSelectElement>) => {
				if (e.key === 'Escape') {
					e.preventDefault();
					selectRef.current?.blur();
				}
			}}
			ref={selectRef}
		/>
	);
}

export const CircleOfFifthsVariantHubSelect = memo(CircleOfFifthsVariantHubSelectComponent);
