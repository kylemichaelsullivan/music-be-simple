import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useChordState } from '../useChordState';

describe('useChordState', () => {
	it('should return initial tonic, variant, and notes', () => {
		const { result } = renderHook(() =>
			useChordState({ initialTonic: 0, initialVariant: 'major' })
		);
		expect(result.current.tonic).toBe(0);
		expect(result.current.variant).toBe('major');
		expect(result.current.notes).toContain(0);
		expect(result.current.notes).toContain(4);
		expect(result.current.notes).toContain(7);
	});

	it('should update tonic via handleTonicChange', async () => {
		const { result } = renderHook(() =>
			useChordState({ initialTonic: 0, initialVariant: 'major' })
		);
		result.current.handleTonicChange(7);
		await waitFor(() => {
			expect(result.current.tonic).toBe(7);
		});
	});

	it('should update variant via handleVariantChange', async () => {
		const { result } = renderHook(() =>
			useChordState({ initialTonic: 0, initialVariant: 'major' })
		);
		result.current.handleVariantChange('minor');
		await waitFor(() => {
			expect(result.current.variant).toBe('minor');
		});
	});

	it('should update notes via makeChord', async () => {
		const { result } = renderHook(() =>
			useChordState({ initialTonic: 0, initialVariant: 'major' })
		);
		result.current.makeChord(9, 'minor');
		await waitFor(() => {
			expect(result.current.notes).toContain(9);
			expect(result.current.notes).toContain(0);
			expect(result.current.notes).toContain(4);
		});
	});

	it('should reset to initial values', async () => {
		const { result } = renderHook(() =>
			useChordState({ initialTonic: 5, initialVariant: 'dominant-7' })
		);
		result.current.handleTonicChange(0);
		result.current.handleVariantChange('major');
		result.current.reset();
		await waitFor(() => {
			expect(result.current.tonic).toBe(5);
			expect(result.current.variant).toBe('dominant-7');
		});
	});

	it('should return getBorderStyle none when showNerdMode is true', () => {
		const { result } = renderHook(() =>
			useChordState({ initialTonic: 0, initialVariant: 'major' })
		);
		expect(result.current.getBorderStyle(0, true)).toBe('none');
		expect(result.current.getBorderStyle(4, true)).toBe('none');
	});

	it('should return getBorderStyle based on chord intervals when showNerdMode is false', () => {
		const { result } = renderHook(() =>
			useChordState({ initialTonic: 0, initialVariant: 'major' })
		);
		expect(result.current.getBorderStyle(0, false)).toBe('none'); // tonic
		// E (4) is the 3 in C major -> 'solid'
		expect(result.current.getBorderStyle(4, false)).toBe('solid');
	});
});
