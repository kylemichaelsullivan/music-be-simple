import { describe, expect, it } from 'vitest';
import {
	ChordBinItemDataSchema,
	ChordVariantSchema,
	NoteIndexSchema,
	NotepadLineDataSchema,
	NotepadLineTitleDataSchema,
	NotepadStorageSchema,
	TuningsStorageSchema,
} from '../schemas';

describe('schemas', () => {
	describe('NoteIndexSchema', () => {
		it('accepts 0–11', () => {
			expect(NoteIndexSchema.safeParse(0).success).toBe(true);
			expect(NoteIndexSchema.safeParse(11).success).toBe(true);
		});
		it('rejects out of range', () => {
			expect(NoteIndexSchema.safeParse(-1).success).toBe(false);
			expect(NoteIndexSchema.safeParse(12).success).toBe(false);
		});
	});

	describe('ChordVariantSchema', () => {
		it('accepts known variants', () => {
			expect(ChordVariantSchema.safeParse('major').success).toBe(true);
			expect(ChordVariantSchema.safeParse('minor').success).toBe(true);
			expect(ChordVariantSchema.safeParse('dominant-7').success).toBe(true);
		});
		it('rejects unknown variants', () => {
			expect(ChordVariantSchema.safeParse('unknown').success).toBe(false);
		});
	});

	describe('TuningsStorageSchema', () => {
		it('accepts valid tunings object', () => {
			const valid = {
				Guitar: [4, 11, 7, 2, 9, 4],
				Ukulele: [9, 4, 0, 7],
			};
			expect(TuningsStorageSchema.safeParse(valid).success).toBe(true);
		});
		it('accepts empty object', () => {
			expect(TuningsStorageSchema.safeParse({}).success).toBe(true);
		});
		it('rejects wrong array length for Guitar', () => {
			expect(TuningsStorageSchema.safeParse({ Guitar: [4, 11, 7] }).success).toBe(false);
		});
		it('rejects invalid note index in array', () => {
			expect(TuningsStorageSchema.safeParse({ Guitar: [4, 11, 7, 2, 9, 99] }).success).toBe(false);
		});
	});

	describe('ChordBinItemDataSchema', () => {
		it('accepts valid chord bin item', () => {
			expect(ChordBinItemDataSchema.safeParse({ id: 1, tonic: 0, variant: 'major' }).success).toBe(
				true
			);
		});
		it('rejects missing fields', () => {
			expect(ChordBinItemDataSchema.safeParse({ id: 1 }).success).toBe(false);
		});
	});

	describe('NotepadLineDataSchema', () => {
		it('accepts valid notepad line', () => {
			expect(NotepadLineDataSchema.safeParse({ id: 1, text: 'Hello' }).success).toBe(true);
		});
		it('adds chords array when missing', () => {
			const result = NotepadLineDataSchema.safeParse({ id: 1, text: 'Hello' });
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.chords).toHaveLength(60);
				expect(result.data.chords.every((chord) => chord === null)).toBe(true);
			}
		});
		it('rejects missing text', () => {
			expect(NotepadLineDataSchema.safeParse({ id: 1 }).success).toBe(false);
		});
	});

	describe('NotepadLineTitleDataSchema', () => {
		it('accepts valid notepad title', () => {
			expect(
				NotepadLineTitleDataSchema.safeParse({
					type: 'title',
					id: 1,
					title: 'Verse',
				}).success
			).toBe(true);
		});
		it('rejects missing type', () => {
			expect(NotepadLineTitleDataSchema.safeParse({ id: 1, title: 'Chorus' }).success).toBe(false);
		});
		it('rejects missing title', () => {
			expect(NotepadLineTitleDataSchema.safeParse({ type: 'title', id: 1 }).success).toBe(false);
		});
	});

	describe('NotepadStorageSchema', () => {
		it('accepts empty array', () => {
			expect(NotepadStorageSchema.safeParse([]).success).toBe(true);
		});
		it('accepts lines only', () => {
			const result = NotepadStorageSchema.safeParse([
				{ id: 1, text: 'Line 1' },
				{ id: 2, text: 'Line 2' },
			]);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toHaveLength(2);
				expect(result.data[0]).toMatchObject({ id: 1, text: 'Line 1' });
				expect(result.data[1]).toMatchObject({ id: 2, text: 'Line 2' });
			}
		});
		it('accepts mixed lines and titles', () => {
			const result = NotepadStorageSchema.safeParse([
				{ type: 'title', id: 10, title: 'Verse' },
				{ id: 1, text: 'Line 1' },
				{ type: 'title', id: 11, title: 'Chorus' },
			]);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toHaveLength(3);
				expect(result.data[0]).toEqual({ type: 'title', id: 10, title: 'Verse' });
				expect(result.data[1]).toMatchObject({ id: 1, text: 'Line 1' });
				expect(result.data[2]).toEqual({ type: 'title', id: 11, title: 'Chorus' });
			}
		});
	});
});
