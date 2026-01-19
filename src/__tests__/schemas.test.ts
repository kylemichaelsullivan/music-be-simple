import { describe, expect, it } from 'vitest';
import {
	ChordBinItemDataSchema,
	ChordVariantSchema,
	NoteIndexSchema,
	NotepadLineDataSchema,
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
			expect(NotepadLineDataSchema.safeParse({ id: 1, content: 'Hello' }).success).toBe(true);
		});
		it('rejects missing content', () => {
			expect(NotepadLineDataSchema.safeParse({ id: 1 }).success).toBe(false);
		});
	});
});
