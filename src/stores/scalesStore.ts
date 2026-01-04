import { NoteIndexSchema, ScaleTypeSchema } from '@/schemas';
import type { NoteIndex, ScaleType } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ScalesStore = {
	tonic: NoteIndex;
	variant: ScaleType;
	setTonic: (tonic: NoteIndex) => void;
	setVariant: (variant: ScaleType) => void;
	reset: () => void;
};

const initialTonic: NoteIndex = 0;
const initialVariant: ScaleType = 'major';

const STORE_NAME = 'scales-store';

const clearStorageOnPageRefresh = (): void => {
	try {
		const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
		const navType = navEntries[0]?.type;
		if (navType === 'reload') {
			sessionStorage.removeItem(STORE_NAME);
		}
	} catch {
		// Performance API unavailable, continue normally
	}
};

clearStorageOnPageRefresh();

const scalesStorage = {
	getItem: (name: string): string | null => {
		try {
			const item = sessionStorage.getItem(name);
			if (!item) return null;
			const parsed = JSON.parse(item);
			if (!parsed.state) return null;

			const validatedTonic = NoteIndexSchema.safeParse(parsed.state.tonic);
			const validatedVariant = ScaleTypeSchema.safeParse(parsed.state.variant);
			if (validatedTonic.success && validatedVariant.success) {
				return item;
			}
			console.error('Invalid scales store data, using defaults');
			return null;
		} catch (error) {
			console.error('Failed to parse scales store from sessionStorage:', error);
			return null;
		}
	},
	setItem: (name: string, value: string): void => {
		try {
			const parsed = JSON.parse(value);
			if (!parsed.state) return;

			const validatedTonic = NoteIndexSchema.safeParse(parsed.state.tonic);
			const validatedVariant = ScaleTypeSchema.safeParse(parsed.state.variant);
			if (validatedTonic.success && validatedVariant.success) {
				sessionStorage.setItem(name, value);
			} else {
				console.error('Failed to validate scales store data before saving');
			}
		} catch (error) {
			console.error('Failed to save scales store to sessionStorage:', error);
		}
	},
	removeItem: (name: string): void => {
		sessionStorage.removeItem(name);
	},
};

export const useScalesStore = create<ScalesStore>()(
	persist(
		(set) => ({
			tonic: initialTonic,
			variant: initialVariant,
			setTonic: (tonic) => set({ tonic }),
			setVariant: (variant) => set({ variant }),
			reset: () => set({ tonic: initialTonic, variant: initialVariant }),
		}),
		{
			name: STORE_NAME,
			storage: createJSONStorage(() => scalesStorage),
			partialize: (state) => ({
				tonic: state.tonic,
				variant: state.variant,
			}),
		}
	)
);
