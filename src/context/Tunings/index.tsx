import { TuningModal } from '@/components/TuningModal';
import { TuningsStorageSchema } from '@/schemas';
import type { NoteIndex, TunableInstrument, TuningsContextProviderProps } from '@/types';
import { useCallback, useContext, useMemo, useState } from 'react';
import type { z } from 'zod';
import { useLocalStorage } from '../shared';
import { TuningsContext } from './TuningsContext';

export { TuningsContext };

const DEFAULT_TUNINGS: Record<TunableInstrument, NoteIndex[]> = {
	Banjo: [2, 11, 7, 2, 7], // [G] D B G D
	Guitar: [4, 11, 7, 2, 9, 4], // E A D G B E
	Mandolin: [4, 9, 2, 7], // G D A E
	Ukulele: [9, 4, 0, 7], // G C E A
};

type StoredTunings = z.infer<typeof TuningsStorageSchema>;
const initialStored: StoredTunings = {};

function TuningsModalGate() {
	const ctx = useContext(TuningsContext);
	if (!ctx || ctx.tuningModalInstrument === null) return null;
	return <TuningModal instrument={ctx.tuningModalInstrument} />;
}

export function TuningsContextProvider({ children }: TuningsContextProviderProps) {
	const [stored, setStored] = useLocalStorage(
		'instrumentTunings',
		TuningsStorageSchema,
		initialStored
	);
	const [tuningModalInstrument, setTuningModalInstrument] = useState<TunableInstrument | null>(
		null
	);

	const getTuning = useCallback(
		(instrument: TunableInstrument): NoteIndex[] => {
			const arr = stored?.[instrument];
			const defaults = DEFAULT_TUNINGS[instrument];
			return arr?.length === (defaults?.length ?? 0) ? arr : defaults;
		},
		[stored]
	);

	const setTuning = useCallback(
		(instrument: TunableInstrument, notes: NoteIndex[]) => {
			setStored((prev) => ({ ...DEFAULT_TUNINGS, ...prev, [instrument]: notes }));
		},
		[setStored]
	);

	const resetTuning = useCallback(
		(instrument: TunableInstrument) => {
			setStored((prev) => ({
				...DEFAULT_TUNINGS,
				...prev,
				[instrument]: DEFAULT_TUNINGS[instrument],
			}));
		},
		[setStored]
	);

	const openTuningModal = useCallback((instrument: TunableInstrument) => {
		setTuningModalInstrument(instrument);
	}, []);

	const closeTuningModal = useCallback(() => {
		setTuningModalInstrument(null);
	}, []);

	const value = useMemo(
		() => ({
			closeTuningModal,
			getTuning,
			openTuningModal,
			resetTuning,
			setTuning,
			tuningModalInstrument,
		}),
		[closeTuningModal, getTuning, openTuningModal, resetTuning, setTuning, tuningModalInstrument]
	);

	return (
		<TuningsContext.Provider value={value}>
			{children}
			<TuningsModalGate />
		</TuningsContext.Provider>
	);
}
