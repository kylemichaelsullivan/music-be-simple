import { Exports, Imports } from './';

export function SaveSectionContent() {
	return (
		<div className='SaveSectionContent flex flex-col gap-4 border shadow-xl w-full p-4 sm:flex-row sm:gap-6'>
			<Imports />
			<Exports />
		</div>
	);
}
