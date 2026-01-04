import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PlayStore = {
	// Add state properties here as needed
	reset: () => void;
};

// sessionStorage persists during navigation but clears on page refresh/reload
const playStorage = {
	getItem: (name: string): string | null => {
		try {
			const item = sessionStorage.getItem(name);
			if (!item) return null;
			const parsed = JSON.parse(item);
			if (parsed.state) {
				return item;
			}
			return null;
		} catch (error) {
			console.error('Failed to parse play store from sessionStorage:', error);
			return null;
		}
	},
	setItem: (name: string, value: string): void => {
		try {
			const parsed = JSON.parse(value);
			if (parsed.state) {
				sessionStorage.setItem(name, value);
			}
		} catch (error) {
			console.error('Failed to save play store to sessionStorage:', error);
		}
	},
	removeItem: (name: string): void => {
		sessionStorage.removeItem(name);
	},
};

export const usePlayStore = create<PlayStore>()(
	persist(
		(set) => ({
			// Add initial state here
			reset: () => set({}),
		}),
		{
			name: 'play-store',
			storage: createJSONStorage(() => playStorage),
			partialize: (state) => ({
				// Add state properties to persist here
			}),
		}
	)
);
