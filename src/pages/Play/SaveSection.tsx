import { ToggleSaveSectionButton } from '@/components/buttons';
import { useState } from 'react';
import { SaveSectionContent } from './';

export function SaveSection() {
	const [isSaveSectionOpen, setIsSaveSectionOpen] = useState(false);

	const toggleSaveSection = () => {
		setIsSaveSectionOpen((prev) => !prev);
	};

	return (
		<div className='SaveSection flex flex-col gap-4 items-center w-full'>
			<ToggleSaveSectionButton isOpen={isSaveSectionOpen} onFxn={toggleSaveSection} />

			{isSaveSectionOpen && <SaveSectionContent />}
		</div>
	);
}
