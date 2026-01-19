import type { NoteIndex, TunableInstrument } from '@/types';
import type { ReactNode } from 'react';

export type TuningsContextProviderProps = {
	children: ReactNode;
};

export type TuningsContextType = {
	closeTuningModal: () => void;
	getTuning: (instrument: TunableInstrument) => NoteIndex[];
	openTuningModal: (instrument: TunableInstrument) => void;
	resetTuning: (instrument: TunableInstrument) => void;
	setTuning: (instrument: TunableInstrument, notes: NoteIndex[]) => void;
	tuningModalInstrument: TunableInstrument | null;
};
