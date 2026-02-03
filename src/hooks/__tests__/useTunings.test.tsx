import { TuningsContextProvider } from '@/context';
import { useTunings } from '@/hooks';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useTunings', () => {
	it('should throw when used outside TuningsContextProvider', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => {
			renderHook(() => useTunings());
		}).toThrow('useTunings must be used within a TuningsContextProvider');

		consoleSpy.mockRestore();
	});

	it('should return context with getTuning, openTuningModal, closeTuningModal, setTuning, resetTuning', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TuningsContextProvider>{children}</TuningsContextProvider>
		);

		const { result } = renderHook(() => useTunings(), { wrapper });

		expect(result.current).toHaveProperty('getTuning');
		expect(result.current).toHaveProperty('openTuningModal');
		expect(result.current).toHaveProperty('closeTuningModal');
		expect(result.current).toHaveProperty('setTuning');
		expect(result.current).toHaveProperty('resetTuning');
		expect(typeof result.current.getTuning).toBe('function');
		expect(typeof result.current.openTuningModal).toBe('function');
		expect(typeof result.current.closeTuningModal).toBe('function');
		expect(typeof result.current.setTuning).toBe('function');
		expect(typeof result.current.resetTuning).toBe('function');
	});

	it('should return default Guitar tuning from getTuning', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TuningsContextProvider>{children}</TuningsContextProvider>
		);

		const { result } = renderHook(() => useTunings(), { wrapper });

		// E A D G B E -> [4, 11, 7, 2, 9, 4]
		expect(result.current.getTuning('Guitar')).toEqual([4, 11, 7, 2, 9, 4]);
	});

	it('should return default Ukulele tuning from getTuning', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<TuningsContextProvider>{children}</TuningsContextProvider>
		);

		const { result } = renderHook(() => useTunings(), { wrapper });

		// G C E A -> [9, 4, 0, 7]
		expect(result.current.getTuning('Ukulele')).toEqual([9, 4, 0, 7]);
	});
});
