import { PlayContextProvider } from '@/context';
import Play from '@/pages/Play';
import { createFileRoute } from '@tanstack/react-router';

function PlayPage() {
	return (
		<PlayContextProvider>
			<Play />
		</PlayContextProvider>
	);
}

export const Route = createFileRoute('/play')({
	component: PlayPage,
});
