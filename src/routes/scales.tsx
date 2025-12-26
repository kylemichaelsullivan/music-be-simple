import Scales from '@/pages/Scales';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/scales')({
	component: Scales,
});
