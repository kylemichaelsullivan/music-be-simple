import type { ScaleMode, ScaleType } from '@/types';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { ModeRelatives } from '.';

type ModeHeadingProps = {
	mode: ScaleMode | ScaleType;
	isCurrent: boolean;
	relativeMajor: string;
	relativeMinor: string;
};

const ModeHeadingComponent = ({
	mode,
	isCurrent,
	relativeMajor,
	relativeMinor,
}: ModeHeadingProps) => {
	const className = useMemo(
		() => clsx('ModeHeading flex flex-col col-span-3', isCurrent ? 'font-bold' : 'font-normal'),
		[isCurrent]
	);

	return (
		<div className={className}>
			<span className='ModeHeadingText'>{mode}</span>
			<ModeRelatives relativeMajor={relativeMajor} relativeMinor={relativeMinor} />
		</div>
	);
};

const ModeHeading = memo(ModeHeadingComponent);

export { ModeHeading };
