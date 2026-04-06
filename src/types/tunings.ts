import type { ReactNode } from 'react';
import type { NoteIndex, TunableInstrument } from '@/types';

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
