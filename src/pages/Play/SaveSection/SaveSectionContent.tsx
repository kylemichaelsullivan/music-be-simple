import { Exports, Imports } from '..';

export function SaveSectionContent() {
	return (
		<div className='SaveSectionContent flex flex-col gap-4 shadow-xl w-full sm:flex-row sm:gap-6'>
			<Imports />
			<Exports />
		</div>
	);
}
