import { PageLayout } from '@/components';
import { useChords } from '@/hooks';
import { Chord, Notes } from '.';

export function Chords() {
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
			title='Chords'
			topButton={{
				icon: nerdModeButtonIcon,
				title: nerdModeButtonTitle,
				onFxn: toggleNerdMode,
			}}
			tonicVariantSlot={<Chord />}
			notesSlot={<Notes />}
			displaysProps={{
				pianoNotes,
				notes,
				tonic,
				getBorderStyle,
				hideModesAndCircle: true,
				showNerdMode,
			}}
		/>
	);
}
