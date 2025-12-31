import type { ScaleMode, ScaleType } from '@/types';
import { useMemo } from 'react';

type ModeProps = {
	mode: ScaleMode | ScaleType;
	background: 'bg-slate-200' | 'bg-slate-300';
	isCurrent: boolean;
	notes: string[];
	relativeMajor: string;
	relativeMinor: string;
};

const Mode = ({ mode, background, isCurrent, notes, relativeMajor, relativeMinor }: ModeProps) => {
	const className = useMemo(() => (isCurrent ? 'font-bold' : 'font-normal'), [isCurrent]);

	const noteElements = useMemo(
		() =>
			notes.map((note: string) => (
				<div className='text-xxs col-span-2 sm:text-base' key={note}>
					{note}
				</div>
			)),
		[notes]
	);

	return (
		<div className={`Mode grid-cols-17 grid items-center ${background} capitalize`}>
			<div className={`${className} flex flex-col text-xxs col-span-3 sm:text-base`}>
				{mode}
				<span className='hidden text-gray-500 text-xxs leading-snug sm:block'>
					[{relativeMajor}, {relativeMinor}
					<span className='lowercase'>m</span>]
				</span>
			</div>
			{noteElements}
		</div>
	);
};

export default Mode;
