import { describe, expect, it } from 'vitest';
import { getBorderClass } from '../borders';

describe('borders utilities', () => {
	describe('getBorderClass', () => {
		it('should return solid border class for solid style', () => {
			const result = getBorderClass('solid');
			expect(result).toBe('border-[3px] border-solid');
		});

		it('should return dashed border class for dashed style', () => {
			const result = getBorderClass('dashed');
			expect(result).toBe('border-[3px] border-dashed');
		});

		it('should return dotted border class for dotted style', () => {
			const result = getBorderClass('dotted');
			expect(result).toBe('border-[3px] border-dotted');
		});

		it('should return double border class for double style', () => {
			const result = getBorderClass('double');
			expect(result).toBe('border-[3px] border-double');
		});

		it('should return empty string for none style', () => {
			const result = getBorderClass('none');
			expect(result).toBe('');
		});

		it('should use bottom position when specified', () => {
			const result = getBorderClass('solid', 'bottom');
			expect(result).toBe('border-b-[3px] border-solid');
		});

		it('should use all position by default', () => {
			const result = getBorderClass('solid');
			expect(result).toContain('border-[3px]');
			expect(result).not.toContain('border-b-[3px]');
		});

		it('should handle all border styles with bottom position', () => {
			expect(getBorderClass('solid', 'bottom')).toBe('border-b-[3px] border-solid');
			expect(getBorderClass('dashed', 'bottom')).toBe('border-b-[3px] border-dashed');
			expect(getBorderClass('dotted', 'bottom')).toBe('border-b-[3px] border-dotted');
			expect(getBorderClass('double', 'bottom')).toBe('border-b-[3px] border-double');
			expect(getBorderClass('none', 'bottom')).toBe('');
		});
	});
});
