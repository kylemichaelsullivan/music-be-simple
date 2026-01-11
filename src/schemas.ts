import { ICONS, INSTRUMENTS } from '@/instruments';
import { TABS } from '@/navigation';
import type { NoteIndex } from '@/types';
import { CHORDS } from '@/utils/chords';
import { SCALE_TYPES } from '@/utils/notes';
import { z } from 'zod';

const chordVariantKeys = new Set<string>();
for (const group of Object.values(CHORDS)) {
	for (const key of Object.keys(group)) {
		chordVariantKeys.add(key);
	}
}
const chordVariantArray = Array.from(chordVariantKeys);

// Basic schemas
export const NoteIndexSchema = z.number().int().min(0).max(11);

export const AccidentalTypeSchema = z.enum(['♭', '♯']);

export const ScaleTypeSchema = z.enum(SCALE_TYPES as [string, ...string[]]);

export const ScaleModeSchema = z.enum([
	'ionian',
	'dorian',
	'phrygian',
	'lydian',
	'mixolydian',
	'aeolian',
	'locrian',
]);

export const ChordVariantSchema = z.string().refine(
	(val) => chordVariantArray.includes(val),
	(val) => ({ message: `Invalid chord variant: ${val}` })
);

export const BorderSchema = z.enum(['double', 'solid', 'dashed', 'dotted', 'none']);

export const InstrumentTypeSchema = z.enum(INSTRUMENTS);

export const IconTypeSchema = z.enum(ICONS);

export const TabTypeSchema = z.enum(TABS);

export const XPositionTypeSchema = z.enum(['left', 'right']);

export const YPositionTypeSchema = z.enum(['top', 'bottom']);

export const PositionTypeSchema = z.union([XPositionTypeSchema, YPositionTypeSchema]);

export const NerdModeButtonIconSchema = z.enum(['🤓', '💃🏾']);

export const NoteLabelsButtonIconSchema = z.enum(['📖', '📕']);

export const ReferenceModeSchema = z.enum(['Chords', 'Scales']);

// Chord schemas
export const ChordInfoSchema = z.object({
	symbol: z.string(),
	display: z.string(),
});

export const ChordDataSchema = z.object({
	display: z.string(),
	intervals: z.array(z.tuple([z.number(), z.string(), BorderSchema])),
	symbols: z.tuple([z.string(), z.string()]),
});

export const ChordGroupSchema = z.record(z.string(), ChordDataSchema);

// localStorage schemas
export const GlobalsStorageSchema = z.object({
	usingFlats: z.boolean(),
	selectedDisplays: z.array(IconTypeSchema),
});

export const ScalesStorageSchema = z.object({
	tonic: NoteIndexSchema,
	variant: ScaleTypeSchema,
	showNoteLabels: z.boolean(),
});

export const ChordsStorageSchema = z.object({
	tonic: NoteIndexSchema,
	variant: ChordVariantSchema,
	showNerdMode: z.boolean(),
});

export const ChordBinItemDataSchema = z.object({
	id: z.number(),
	tonic: z.custom<NoteIndex>((val) => {
		return typeof val === 'number' && Number.isInteger(val) && val >= 0 && val <= 11;
	}),
	variant: ChordVariantSchema,
});

export const NotepadLineDataSchema = z.object({
	id: z.number(),
	content: z.string(),
});

export const ChordBinStorageSchema = z.array(ChordBinItemDataSchema);

export const NotepadStorageSchema = z.array(NotepadLineDataSchema);
