import { ChordsContextProvider, PlayContextProvider, ScalesContextProvider } from '@/context';
import { Play } from '@/pages/Play';
import { createFileRoute } from '@tanstack/react-router';

export function PlayPage() {
	return (
		<ScalesContextProvider>
			<ChordsContextProvider>
				<PlayContextProvider>
					<Play />
				</PlayContextProvider>
			</ChordsContextProvider>
		</ScalesContextProvider>
	);
}

export const Route = createFileRoute('/play')({
	component: PlayPage,
});
