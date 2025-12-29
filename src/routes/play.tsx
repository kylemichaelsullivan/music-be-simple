import { PlayContextProvider } from '@/context';
import PlayIndex from '@/pages/Play';
import { createFileRoute } from '@tanstack/react-router';

export default function PlayPage() {
	return (
		<PlayContextProvider>
			<PlayIndex />
		</PlayContextProvider>
	);
}

export const Route = createFileRoute('/play')({
	component: PlayPage,
});
