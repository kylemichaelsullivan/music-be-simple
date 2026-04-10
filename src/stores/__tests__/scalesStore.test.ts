import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useScalesStore } from '@/stores';

describe('scalesStore', () => {
	beforeEach(async () => {
		sessionStorage.clear();
		useScalesStore.getState().reset();
		await useScalesStore.persist.rehydrate();
	});

	afterEach(() => {
		useScalesStore.getState().reset();
	});

	it('should have initial tonic 0 and variant major', () => {
		expect(useScalesStore.getState().tonic).toBe(0);
		expect(useScalesStore.getState().variant).toBe('major');
	});

	it('should update tonic via setTonic', () => {
		useScalesStore.getState().setTonic(7);
		expect(useScalesStore.getState().tonic).toBe(7);
	});

	it('should update variant via setVariant', () => {
		useScalesStore.getState().setVariant('dorian');
		expect(useScalesStore.getState().variant).toBe('dorian');
	});

	it('should reset to initial values', () => {
		useScalesStore.getState().setTonic(11);
		useScalesStore.getState().setVariant('phrygian');
		useScalesStore.getState().reset();
		expect(useScalesStore.getState().tonic).toBe(0);
		expect(useScalesStore.getState().variant).toBe('major');
	});
});
