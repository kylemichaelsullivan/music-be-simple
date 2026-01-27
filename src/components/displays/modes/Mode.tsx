import type { ScaleMode, ScaleType } from '@/types';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { ModeHeading } from './ModeHeading';
import { ModeNote } from './ModeNote';

type ModeProps = {
	mode: ScaleMode | ScaleType;
	background: 'bg-slate-200' | 'bg-slate-300';
	isCurrent: boolean;
	notes: string[];
	relativeMajor: string;
	relativeMinor: string;
};

const ModeComponent = ({ mode, background, isCurrent, notes, relativeMajor, relativeMinor }: ModeProps) => {
	const noteElements = useMemo(
		() =>
			notes.map((note: string) => <ModeNote note={note} key={note} />),
		[notes]
	);

	const containerClassName = useMemo(
		() => clsx('Mode grid-cols-17 grid items-center', background, 'capitalize'),
		[background]
	);

	return (
		<div className={containerClassName}>
			<ModeHeading mode={mode} isCurrent={isCurrent} relativeMajor={relativeMajor} relativeMinor={relativeMinor} />
			{noteElements}
		</div>
	);
};

const Mode = memo(ModeComponent);

export { Mode };
