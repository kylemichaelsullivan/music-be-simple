import { PageLayout } from '@/components/PageLayout';
import { useChords } from '@/hooks';
import { Chord, Notes } from './';

export function Chords() {
	const {
		notes,
		tonic,
		getBorderStyle,
		nerdModeButtonIcon,
		nerdModeButtonTitle,
		showNerdMode,
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
			displaysProps={{ notes, tonic, getBorderStyle, showNerdMode }}
		/>
	);
}
