import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ScalesState = {
	selections: Record<string, unknown>;
	inputs: Record<string, unknown>;
};

type ChordsState = {
	selections: Record<string, unknown>;
	inputs: Record<string, unknown>;
};

type WriteState = {
	content: string;
};

type AppState = {
	scales: ScalesState;
	chords: ChordsState;
	write: WriteState;
	setScalesSelections: (selections: Record<string, unknown>) => void;
	setScalesInputs: (inputs: Record<string, unknown>) => void;
	setChordsSelections: (selections: Record<string, unknown>) => void;
	setChordsInputs: (inputs: Record<string, unknown>) => void;
	setWriteContent: (content: string) => void;
};

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			scales: {
				selections: {},
				inputs: {},
			},
			chords: {
				selections: {},
				inputs: {},
			},
			write: {
				content: '',
			},
			setScalesSelections: (selections) =>
				set((state) => ({
					scales: { ...state.scales, selections },
				})),
			setScalesInputs: (inputs) =>
				set((state) => ({
					scales: { ...state.scales, inputs },
				})),
			setChordsSelections: (selections) =>
				set((state) => ({
					chords: { ...state.chords, selections },
				})),
			setChordsInputs: (inputs) =>
				set((state) => ({
					chords: { ...state.chords, inputs },
				})),
			setWriteContent: (content) =>
				set((state) => ({
					write: { ...state.write, content },
				})),
		}),
		{
			name: 'music-be-simple-storage',
		}
	)
);
