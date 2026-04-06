import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useScales } from '@/hooks';
import { getScaleTypeDisplay } from '@/utils';
import { CircleOfFifthsVariantHubSelect } from './CircleOfFifthsVariantHubSelect';
import { CircleOfFifthsVariantHubTrigger } from './CircleOfFifthsVariantHubTrigger';

function CircleOfFifthsVariantHubComponent() {
	const { variant } = useScales();
	const variantDisplay = useMemo(() => getScaleTypeDisplay(variant), [variant]);
	const selectRef = useRef<HTMLSelectElement>(null);
	const [hovered, setHovered] = useState(false);
	const [selectFocused, setSelectFocused] = useState(false);
	const [pinnedOpen, setPinnedOpen] = useState(false);

	/** After picking a variant, show text even while the pointer is still over the hub; cleared on mouse leave. */
	const [hideSelectAfterPick, setHideSelectAfterPick] = useState(false);

	const showSelect = (hovered || selectFocused || pinnedOpen) && !hideSelectAfterPick;

	useEffect(() => {
		if (pinnedOpen) {
			const id = requestAnimationFrame(() => {
				selectRef.current?.focus();
			});
			return () => cancelAnimationFrame(id);
		}
	}, [pinnedOpen]);

	const openPinned = () => {
		// Click/keyboard activation should always force the select visible.
		setHideSelectAfterPick(false);
		setPinnedOpen(true);
	};

	return (
		<div
			className='CircleOfFifthsVariantHub w-full min-w-0'
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => {
				setHovered(false);
				setHideSelectAfterPick(false);
			}}
		>
			{!showSelect ? (
				<CircleOfFifthsVariantHubTrigger variantDisplay={variantDisplay} onOpen={openPinned} />
			) : (
				<CircleOfFifthsVariantHubSelect
					selectRef={selectRef}
					onAfterVariantChange={() => {
						setHideSelectAfterPick(true);
						setPinnedOpen(false);
						setSelectFocused(false);
					}}
					onBlur={() => {
						setSelectFocused(false);
						setPinnedOpen(false);
					}}
					onFocus={() => setSelectFocused(true)}
				/>
			)}
		</div>
	);
}

export const CircleOfFifthsVariantHub = memo(CircleOfFifthsVariantHubComponent);
