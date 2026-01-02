import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { IconType } from '@/instruments';
import type { GlobalsContextProviderProps } from '@/types';
import { FREQUENCIES } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../shared';
import { GlobalsContext } from './GlobalsContext';

export { GlobalsContext };

const initialUsingFlats: boolean = true;
const initialDisplays: IconType[] = INSTRUMENT_ORDER.map((instrument) => ICON_MAP[instrument]);

export const GlobalsContextProvider = ({ children }: GlobalsContextProviderProps) => {
	const [usingFlats, setUsingFlats] = useLocalStorage<boolean>('usingFlats', initialUsingFlats);
	const [displays, setDisplays] = useLocalStorage<IconType[]>('selectedDisplays', initialDisplays);

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

	const handleDisplaysClick = useCallback(
		(icon: IconType) => {
			setDisplays((prev: IconType[]) => {
				const newDisplays = prev.includes(icon)
					? prev.filter((item: IconType) => item !== icon)
					: [...prev, icon];
				return newDisplays;
			});
		},
		[setDisplays]
	);

	const toggleUsingFlats = useCallback(() => {
		setUsingFlats((prev) => !prev);
	}, [setUsingFlats]);

	const capitalizeFirstLetter = useCallback((string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
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
			usingFlats,
			displays,
			toggleUsingFlats,
			handleDisplaysClick,
			capitalizeFirstLetter,
			playNote,
		}),
		[usingFlats, displays, toggleUsingFlats, handleDisplaysClick, capitalizeFirstLetter, playNote]
	);

	return <GlobalsContext.Provider value={contextValue}>{children}</GlobalsContext.Provider>;
};
