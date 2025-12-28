import { ChordsContextProvider } from '@/context';
import Chords from '@/pages/Chords';
import { createFileRoute } from '@tanstack/react-router';

function ChordsPage() {
	return (
		<ChordsContextProvider>
			<Chords />
		</ChordsContextProvider>
	);
}

export const Route = createFileRoute('/chords')({
	component: ChordsPage,
});
