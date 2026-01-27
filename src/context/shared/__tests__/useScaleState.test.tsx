import type { ScaleType } from '@/types';
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useScaleState } from '../useScaleState';

describe('useScaleState', () => {
	it('should return initial tonic, variant, and notes', () => {
		const { result } = renderHook(() =>
			useScaleState({ initialTonic: 0, initialVariant: 'major' })
		);
		expect(result.current.tonic).toBe(0);
		expect(result.current.variant).toBe('major');
		expect(result.current.notes).toHaveLength(7);
		expect(result.current.notes).toContain(0);
	});

	it('should update tonic via handleTonicChange', async () => {
		const { result } = renderHook(() =>
			useScaleState({ initialTonic: 0, initialVariant: 'major' })
		);
		act(() => {
			result.current.handleTonicChange(7);
		});
		await waitFor(() => {
			expect(result.current.tonic).toBe(7);
			expect(result.current.notes[0]).toBe(7);
		});
	});

	it('should update variant via handleVariantChange', async () => {
		const { result } = renderHook(() =>
			useScaleState<ScaleType>({ initialTonic: 0, initialVariant: 'major' })
		);
		act(() => {
			result.current.handleVariantChange('dorian');
		});
		await waitFor(() => {
			expect(result.current.variant).toBe('dorian');
			expect(result.current.notes).toContain(3);
		});
	});

	it('should update notes via makeScale', async () => {
		const { result } = renderHook(() =>
			useScaleState<ScaleType>({ initialTonic: 0, initialVariant: 'major' })
		);
		act(() => {
			result.current.makeScale(7, 'dorian');
		});
		await waitFor(() => {
			expect(result.current.notes[0]).toBe(7);
			expect(result.current.notes).toHaveLength(7);
		});
	});

	it('should reset to initial values', async () => {
		const { result } = renderHook(() =>
			useScaleState<ScaleType>({ initialTonic: 5, initialVariant: 'minor' })
		);
		act(() => {
			result.current.handleTonicChange(0);
			result.current.handleVariantChange('major');
			result.current.reset();
		});
		await waitFor(() => {
			expect(result.current.tonic).toBe(5);
			expect(result.current.variant).toBe('minor');
		});
	});
});
