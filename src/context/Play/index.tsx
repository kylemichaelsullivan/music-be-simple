import { useCallback, useEffect, useMemo, useState } from 'react';

import { FREQUENCIES } from '@/utils/notes';

import type { PlayContextProviderProps } from '@/types/play';
import { useRequireGlobals } from '../shared/useRequireGlobals';
import { PlayContext } from './PlayContext';

export { PlayContext };

export const PlayContextProvider = ({ children }: PlayContextProviderProps) => {
	useRequireGlobals(); // Ensure GlobalsContext is available

	const [notePlaying, setNotePlaying] = useState<boolean>(false);
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

	useEffect(() => {
		const context = new AudioContext();
		setAudioContext(context);
		return () => {
			context.close();
		};
	}, []);

	const getFrequency = useCallback((note: number) => {
		return FREQUENCIES[note];
	}, []);

	const playNote = useCallback(
		(note: number) => {
			if (!audioContext || notePlaying) return;

			const oscillator = audioContext.createOscillator();
			oscillator.type = 'sine';
			oscillator.frequency.value = getFrequency(note);
			oscillator.connect(audioContext.destination);

			oscillator.start();
			setNotePlaying(true);

			setTimeout(() => {
				oscillator.stop();
				oscillator.disconnect();
				setNotePlaying(false);
			}, 1000);
		},
		[audioContext, getFrequency, notePlaying]
	);

	const contextValue = useMemo(
		() => ({
			playNote,
		}),
		[playNote]
	);

	return <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>;
};
