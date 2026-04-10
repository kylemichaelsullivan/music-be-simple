import { PageLayout } from '@/components';
import { useChords } from '@/hooks';
import { Chord } from '@/pages/Chords/Chord';
import { Notes } from '@/pages/Chords/Notes';
import { PlayBottomSection } from './PlayBottomSection';

export function Play() {
	const {
		notes,
		tonic,
		nerdModeButtonIcon,
		nerdModeButtonTitle,
		pianoNotes,
		showNerdMode,
		getBorderStyle,
		toggleNerdMode,
	} = useChords();

	return (
		<PageLayout
			title='Play'
			tonicVariantSlot={<Chord />}
			notesSlot={<Notes />}
			topButton={{
				icon: nerdModeButtonIcon,
				title: nerdModeButtonTitle,
				onFxn: toggleNerdMode,
			}}
			displaysProps={{
				pianoNotes,
				notes,
				tonic,
				getBorderStyle,
				hideModesAndCircle: true,
				showNerdMode,
				isPlayPage: true,
			}}
			afterDisplaysSlot={<PlayBottomSection />}
		/>
	);
}
