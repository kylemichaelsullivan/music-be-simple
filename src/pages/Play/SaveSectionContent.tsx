import Exports from './Exports';
import Imports from './Imports';

export default function SaveSectionContent() {
	return (
		<div className='SaveSectionContent flex flex-col gap-4 border w-full p-4 sm:flex-row sm:gap-6'>
			<Imports />
			<Exports />
		</div>
	);
}
