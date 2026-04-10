import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useChordsStore } from '@/stores';

describe('chordsStore', () => {
	beforeEach(async () => {
		sessionStorage.clear();
		useChordsStore.getState().reset();
		await useChordsStore.persist.rehydrate();
	});

	afterEach(() => {
		useChordsStore.getState().reset();
	});

	it('should have initial tonic 0 and variant major', () => {
		expect(useChordsStore.getState().tonic).toBe(0);
		expect(useChordsStore.getState().variant).toBe('major');
	});

	it('should update tonic via setTonic', () => {
		useChordsStore.getState().setTonic(7);
		expect(useChordsStore.getState().tonic).toBe(7);
	});

	it('should update variant via setVariant', () => {
		useChordsStore.getState().setVariant('minor');
		expect(useChordsStore.getState().variant).toBe('minor');
	});

	it('should reset to initial values', () => {
		useChordsStore.getState().setTonic(11);
		useChordsStore.getState().setVariant('dominant-7');
		useChordsStore.getState().reset();
		expect(useChordsStore.getState().tonic).toBe(0);
		expect(useChordsStore.getState().variant).toBe('major');
	});
});
