import type { Chord_Tonic, Chord_Variant, NoteIndex, ScaleType } from '@/types';
import { ALL_CHORD_VARIANTS, getChordVariantsForChordGroups } from './chords';
import { getScaleTypesFromScaleGroups, randomNoteIndex, randomPick, SCALE_TYPES } from './notes';

export type ScaleRandomTierId = 'all' | 'tonic_only' | 'tonic_variant_modes' | 'variant_basic';

export type ChordRandomTierId = 'all' | 'tonic_only' | 'tonic_variant_foundation' | 'variant_basic';

const SCALE_TYPES_BASIC: readonly ScaleType[] = ['major', 'minor'];

const SCALE_POOL_MODES_TIER = getScaleTypesFromScaleGroups([
	'Common Scales',
	'Modes of the Major Scale',
] as const);

const CHORD_POOL_SIMPLE_TRIADS = getChordVariantsForChordGroups(['Simple Triads']);

const CHORD_POOL_FOUNDATION = getChordVariantsForChordGroups([
	'Simple Triads',
	'Other Triads',
	'Seventh Chords',
]);

export type RandomTierOption<T extends string> = {
	description: string;
	id: T;
	label: string;
};

export const SCALE_RANDOM_TIER_OPTIONS: readonly RandomTierOption<ScaleRandomTierId>[] = [
	{
		id: 'tonic_only',
		label: 'Random tonic only',
		description: 'New root note; same scale type.',
	},
	{
		id: 'variant_basic',
		label: 'Random scale type (major / minor)',
		description: 'Same root; major or minor only.',
	},
	{
		id: 'tonic_variant_modes',
		label: 'Random tonic + modes',
		description: 'Root and type from major, minor and the seven modes.',
	},
	{
		id: 'all',
		label: 'Random (everything)',
		description: 'Root and any scale type in the app.',
	},
] as const;

export const CHORD_RANDOM_TIER_OPTIONS: readonly RandomTierOption<ChordRandomTierId>[] = [
	{
		id: 'tonic_only',
		label: 'Random tonic only',
		description: 'New root note; same chord type.',
	},
	{
		id: 'variant_basic',
		label: 'Random chord type (simple triads)',
		description: 'Same root; simple triads only.',
	},
	{
		id: 'tonic_variant_foundation',
		label: 'Random tonic + foundation chords',
		description: 'Root and type from simple triads, other triads and seventh chords.',
	},
	{
		id: 'all',
		label: 'Random (everything)',
		description: 'Root and any chord type in the app.',
	},
] as const;

export const DEFAULT_SCALE_RANDOM_TIER: ScaleRandomTierId = 'tonic_variant_modes';

export const DEFAULT_CHORD_RANDOM_TIER: ChordRandomTierId = 'tonic_variant_foundation';

export function applyScaleRandomTier(
	tier: ScaleRandomTierId,
	ctx: {
		makeScale: (tonic: NoteIndex, variant: ScaleType) => void;
		tonic: NoteIndex;
		variant: ScaleType;
	}
): void {
	const { makeScale, tonic, variant } = ctx;
	switch (tier) {
		case 'tonic_only':
			makeScale(randomNoteIndex(), variant);
			break;
		case 'variant_basic':
			makeScale(tonic, randomPick(SCALE_TYPES_BASIC));
			break;
		case 'tonic_variant_modes':
			makeScale(randomNoteIndex(), randomPick(SCALE_POOL_MODES_TIER));
			break;
		case 'all':
			makeScale(randomNoteIndex(), randomPick(SCALE_TYPES));
			break;
	}
}

export function applyChordRandomTier(
	tier: ChordRandomTierId,
	ctx: {
		makeScale: (tonic: Chord_Tonic, variant: Chord_Variant) => void;
		tonic: Chord_Tonic;
		variant: Chord_Variant;
	}
): void {
	const { makeScale, tonic, variant } = ctx;
	switch (tier) {
		case 'tonic_only':
			makeScale(randomNoteIndex(), variant);
			break;
		case 'variant_basic':
			makeScale(tonic, randomPick(CHORD_POOL_SIMPLE_TRIADS));
			break;
		case 'tonic_variant_foundation':
			makeScale(randomNoteIndex(), randomPick(CHORD_POOL_FOUNDATION));
			break;
		case 'all':
			makeScale(randomNoteIndex(), randomPick(ALL_CHORD_VARIANTS));
			break;
	}
}
