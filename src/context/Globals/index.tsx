import { useCallback, useMemo } from 'react';

import { FLATS, SHARPS } from '@/utils/notes';

import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { IconType } from '@/instruments';

import type { GlobalsContextProviderProps } from '@/types/globals';
import { useLocalStorage } from '../shared/useLocalStorage';
import { GlobalsContext } from './GlobalsContext';

export { GlobalsContext };

const initialUsingFlats: boolean = true;
const initialDisplays: IconType[] = INSTRUMENT_ORDER.map((instrument) => ICON_MAP[instrument]);
const initialShowNerdMode: boolean = true;

export const GlobalsContextProvider = ({ children }: GlobalsContextProviderProps) => {
	const [usingFlats, setUsingFlats] = useLocalStorage<boolean>('usingFlats', initialUsingFlats);
	const [displays, setDisplays] = useLocalStorage<IconType[]>('selectedDisplays', initialDisplays);
	const [showNerdMode, setShowNerdMode] = useLocalStorage<boolean>(
		'showNerdMode',
		initialShowNerdMode
	);

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

	const toggleShowNerdMode = useCallback(() => {
		setShowNerdMode((prev: boolean) => !prev);
	}, [setShowNerdMode]);

	const capitalizeFirstLetter = useCallback((string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}, []);

	const currentScale = useMemo(() => {
		return usingFlats ? FLATS : SHARPS;
	}, [usingFlats]);

	const getNote = useCallback(
		(note: number) => {
			return currentScale[note];
		},
		[currentScale]
	);

	const contextValue = useMemo(
		() => ({
			usingFlats,
			displays,
			showNerdMode,
			toggleUsingFlats,
			handleDisplaysClick,
			toggleShowNerdMode,
			getNote,
			capitalizeFirstLetter,
		}),
		[
			usingFlats,
			displays,
			showNerdMode,
			toggleUsingFlats,
			handleDisplaysClick,
			toggleShowNerdMode,
			getNote,
			capitalizeFirstLetter,
		]
	);

	return <GlobalsContext.Provider value={contextValue}>{children}</GlobalsContext.Provider>;
};
