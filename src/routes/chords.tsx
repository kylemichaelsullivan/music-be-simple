import { ChordsContextProvider } from '@/context';
import ChordsIndex from '@/pages/Chords';
import { createFileRoute } from '@tanstack/react-router';

export default function ChordsPage() {
	return (
		<ChordsContextProvider>
			<ChordsIndex />
		</ChordsContextProvider>
	);
}

export const Route = createFileRoute('/chords')({
	component: ChordsPage,
});
