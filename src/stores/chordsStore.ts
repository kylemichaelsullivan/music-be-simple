import { ChordVariantSchema, NoteIndexSchema } from '@/schemas';
import type { Chord_Tonic, Chord_Variant } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ChordsStore = {
	tonic: Chord_Tonic;
	variant: Chord_Variant;
	setTonic: (tonic: Chord_Tonic) => void;
	setVariant: (variant: Chord_Variant) => void;
	reset: () => void;
};

const initialTonic: Chord_Tonic = 0;
const initialVariant: Chord_Variant = 'major';

const STORE_NAME = 'chords-store';

const chordsStorage = {
	getItem: (name: string): string | null => {
		try {
			if (typeof sessionStorage === 'undefined') {
				return null;
			}
			const item = sessionStorage.getItem(name);
			if (!item) return null;
			const parsed = JSON.parse(item);
			if (!parsed.state) return null;

			const validatedTonic = NoteIndexSchema.safeParse(parsed.state.tonic);
			const validatedVariant = ChordVariantSchema.safeParse(parsed.state.variant);
			if (validatedTonic.success && validatedVariant.success) {
				return item;
			}
			console.error('Invalid chords store data, using defaults');
			return null;
		} catch (error) {
			console.error('Failed to parse chords store from sessionStorage:', error);
			return null;
		}
	},
	setItem: (name: string, value: string): void => {
		try {
			if (typeof sessionStorage === 'undefined') {
				return;
			}
			const parsed = JSON.parse(value);
			if (!parsed.state) return;

			const validatedTonic = NoteIndexSchema.safeParse(parsed.state.tonic);
			const validatedVariant = ChordVariantSchema.safeParse(parsed.state.variant);
			if (validatedTonic.success && validatedVariant.success) {
				sessionStorage.setItem(name, value);
			} else {
				console.error('Failed to validate chords store data before saving');
			}
		} catch (error) {
			console.error('Failed to save chords store to sessionStorage:', error);
		}
	},
	removeItem: (name: string): void => {
		try {
			if (typeof sessionStorage !== 'undefined') {
				sessionStorage.removeItem(name);
			}
		} catch {}
	},
};

export const useChordsStore = create<ChordsStore>()(
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
			storage: createJSONStorage(() => chordsStorage),
			partialize: (state) => ({
				tonic: state.tonic,
				variant: state.variant,
			}),
		}
	)
);
