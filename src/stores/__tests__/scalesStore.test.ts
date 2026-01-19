import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useScalesStore } from '../scalesStore';

describe('scalesStore', () => {
	afterEach(() => {
		useScalesStore.getState().reset();
	});

	it('should have initial tonic 0 and variant major', () => {
		const { result } = renderHook(() => useScalesStore());
		expect(result.current.tonic).toBe(0);
		expect(result.current.variant).toBe('major');
	});

	it('should update tonic via setTonic', async () => {
		const { result } = renderHook(() => useScalesStore());
		result.current.setTonic(7);
		await waitFor(() => {
			expect(result.current.tonic).toBe(7);
		});
	});

	it('should update variant via setVariant', async () => {
		const { result } = renderHook(() => useScalesStore());
		result.current.setVariant('dorian');
		await waitFor(() => {
			expect(result.current.variant).toBe('dorian');
		});
	});

	it('should reset to initial values', async () => {
		const { result } = renderHook(() => useScalesStore());
		result.current.setTonic(11);
		result.current.setVariant('phrygian');
		result.current.reset();
		await waitFor(() => {
			expect(result.current.tonic).toBe(0);
			expect(result.current.variant).toBe('major');
		});
	});
});
