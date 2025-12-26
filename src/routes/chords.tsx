import Chords from '@/pages/Chords';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chords')({
	component: Chords,
});
