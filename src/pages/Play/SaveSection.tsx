import ToggleSaveSectionButton from '@/components/buttons/ToggleSaveSectionButton';
import { useState } from 'react';
import SaveSectionContent from './SaveSectionContent';

export default function SaveSection() {
	const [isSaveSectionOpen, setIsSaveSectionOpen] = useState(false);

	const toggleSaveSection = () => {
		setIsSaveSectionOpen((prev) => !prev);
	};

	return (
		<div className='SaveSection flex flex-col gap-4 items-center w-full p-4'>
			<ToggleSaveSectionButton isOpen={isSaveSectionOpen} onFxn={toggleSaveSection} />

			{isSaveSectionOpen && <SaveSectionContent />}
		</div>
	);
}
