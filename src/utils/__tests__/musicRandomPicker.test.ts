import { describe, expect, it, vi } from 'vitest';
import {
	applyChordRandomTier,
	applyScaleRandomTier,
	CHORD_RANDOM_TIER_OPTIONS,
	SCALE_RANDOM_TIER_OPTIONS,
} from '@/utils';

describe('musicRandomPicker', () => {
	it('should define four scale tiers', () => {
		expect(SCALE_RANDOM_TIER_OPTIONS).toHaveLength(4);
	});

	it('should define four chord tiers', () => {
		expect(CHORD_RANDOM_TIER_OPTIONS).toHaveLength(4);
	});

	it('applyScaleRandomTier tonic_only should only change tonic', () => {
		const makeScale = vi.fn();
		applyScaleRandomTier('tonic_only', {
			makeScale,
			tonic: 0,
			variant: 'dorian',
		});
		expect(makeScale).toHaveBeenCalledTimes(1);
		const [t, v] = makeScale.mock.calls[0] ?? [];
		expect(v).toBe('dorian');
		expect(typeof t).toBe('number');
	});

	it('applyScaleRandomTier variant_basic should keep tonic', () => {
		const makeScale = vi.fn();
		applyScaleRandomTier('variant_basic', {
			makeScale,
			tonic: 5,
			variant: 'major',
		});
		expect(makeScale).toHaveBeenCalledWith(5, expect.stringMatching(/major|minor/));
	});

	it('applyChordRandomTier variant_basic should keep tonic', () => {
		const makeScale = vi.fn();
		applyChordRandomTier('variant_basic', {
			makeScale,
			tonic: 7,
			variant: 'major',
		});
		expect(makeScale).toHaveBeenCalledWith(7, expect.any(String));
	});
});
