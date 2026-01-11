import { ScalesContextProvider } from '@/context';
import { Scales } from '@/pages/Scales';
import { createFileRoute } from '@tanstack/react-router';

export function ScalesPage() {
	return (
		<ScalesContextProvider>
			<Scales />
		</ScalesContextProvider>
	);
}

export const Route = createFileRoute('/scales')({
	component: ScalesPage,
});
