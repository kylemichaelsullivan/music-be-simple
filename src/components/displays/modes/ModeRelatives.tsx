import { memo } from 'react';

type ModeRelativesProps = {
	relativeMajor: string;
	relativeMinor: string;
};

const ModeRelativesComponent = ({ relativeMajor, relativeMinor }: ModeRelativesProps) => {
	return (
		<span className='ModeRelatives hidden text-gray-500 leading-snug sm:block'>
			[{relativeMajor}, {relativeMinor}
			<span className='lowercase'>m</span>]
		</span>
	);
};

const ModeRelatives = memo(ModeRelativesComponent);

export { ModeRelatives };
