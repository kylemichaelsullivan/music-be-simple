import { ScalesContextProvider } from '@/context';
import ScalesIndex from '@/pages/Scales';
import { createFileRoute } from '@tanstack/react-router';

export default function ScalesPage() {
	return (
		<ScalesContextProvider>
			<ScalesIndex />
		</ScalesContextProvider>
	);
}

export const Route = createFileRoute('/scales')({
	component: ScalesPage,
});
