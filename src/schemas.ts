import { ICONS, INSTRUMENTS } from '@/instruments';
import { TABS } from '@/navigation';
import { CHORDS, SCALE_TYPES } from '@/utils';
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

// NoteIndex schema that properly infers NoteIndex union type (for use with useLocalStorage and storage schemas)
export const NoteIndexZodSchema = z.union([
	z.literal(0),
	z.literal(1),
	z.literal(2),
	z.literal(3),
	z.literal(4),
	z.literal(5),
	z.literal(6),
	z.literal(7),
	z.literal(8),
	z.literal(9),
	z.literal(10),
	z.literal(11),
]);

// localStorage schemas
export const GlobalsStorageSchema = z.object({
	usingFlats: z.boolean(),
	selectedDisplays: z.array(IconTypeSchema),
});

export const ScalesStorageSchema = z.object({
	tonic: NoteIndexZodSchema,
	variant: ScaleTypeSchema,
	showModes: z.boolean(),
	showNoteLabels: z.boolean(),
});

export const ChordsStorageSchema = z.object({
	tonic: NoteIndexZodSchema,
	variant: ChordVariantSchema,
	showNerdMode: z.boolean(),
});

export const ChordBinItemDataSchema = z.object({
	id: z.number(),
	tonic: NoteIndexZodSchema,
	variant: ChordVariantSchema,
	name: z.string().optional(),
});

export const NotepadLineDataSchema = z
	.object({
		id: z.number(),
		text: z.string(),
		chords: z.array(z.number().nullable()).length(60).optional(),
	})
	.transform((data) => ({
		...data,
		chords: data.chords ?? Array(60).fill(null),
	}));

export const NotepadLineTitleDataSchema = z.object({
	type: z.literal('title'),
	id: z.number(),
	title: z.string(),
});

export const NotepadItemSchema = z.union([NotepadLineTitleDataSchema, NotepadLineDataSchema]);

export const ChordBinStorageSchema = z.array(ChordBinItemDataSchema);

// Tunings: open string note indices per instrument (Guitar 6, Banjo 5 including drone, Mandolin 4, Ukulele 4)
export const TuningsStorageSchema = z.object({
	Banjo: z.array(NoteIndexZodSchema).length(5).optional(),
	Guitar: z.array(NoteIndexZodSchema).length(6).optional(),
	Mandolin: z.array(NoteIndexZodSchema).length(4).optional(),
	Ukulele: z.array(NoteIndexZodSchema).length(4).optional(),
});

export const NotepadStorageSchema = z.array(NotepadItemSchema);
