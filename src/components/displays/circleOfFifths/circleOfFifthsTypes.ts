import type { NoteIndex } from '@/types';

export type CircleOfFifthsSegment = {
	majorIndex: NoteIndex;
	majorLabel: string;
	sigLabel: string;
	intervalLabel: string;
	majorWedgePath: string;
	majorLabelPosition: { x: number; y: number };
	intervalLabelPosition: { x: number; y: number };
	sigLabelPosition: { x: number; y: number };
	isCurrentTonic: boolean;
	inSelectedScale: boolean;
	wedgeStartRad: number;
};
