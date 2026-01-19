import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useChordsStore } from '../chordsStore';

describe('chordsStore', () => {
	afterEach(() => {
		useChordsStore.getState().reset();
	});

	it('should have initial tonic 0 and variant major', () => {
		const { result } = renderHook(() => useChordsStore());
		expect(result.current.tonic).toBe(0);
		expect(result.current.variant).toBe('major');
	});

	it('should update tonic via setTonic', async () => {
		const { result } = renderHook(() => useChordsStore());
		result.current.setTonic(7);
		await waitFor(() => {
			expect(result.current.tonic).toBe(7);
		});
	});

	it('should update variant via setVariant', async () => {
		const { result } = renderHook(() => useChordsStore());
		result.current.setVariant('minor');
		await waitFor(() => {
			expect(result.current.variant).toBe('minor');
		});
	});

	it('should reset to initial values', async () => {
		const { result } = renderHook(() => useChordsStore());
		result.current.setTonic(11);
		result.current.setVariant('dominant-7');
		result.current.reset();
		await waitFor(() => {
			expect(result.current.tonic).toBe(0);
			expect(result.current.variant).toBe('major');
		});
	});
});
