import { ToggleSaveSectionButton } from '@/components/buttons';
import { useState } from 'react';
import { SaveSectionContent } from '.';

export function SaveSection() {
	const [isSaveSectionOpen, setIsSaveSectionOpen] = useState(false);

	const toggleSaveSection = () => {
		setIsSaveSectionOpen((prev) => !prev);
	};

	return (
		<div className='SaveSection flex flex-col gap-4 items-center bg-slate-200 border w-full p-4'>
			<ToggleSaveSectionButton isOpen={isSaveSectionOpen} onFxn={toggleSaveSection} />

			{isSaveSectionOpen && <SaveSectionContent />}
		</div>
	);
}
