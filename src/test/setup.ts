// This setup file is preloaded by bunfig.toml for all bun tests
// It should only run setup for Vitest tests, not Playwright E2E tests
// We check for vitest availability before running setup

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Only run setup if we're in a jsdom environment (Vitest tests, not Playwright)
if (typeof window !== 'undefined') {
	// Mock localStorage
	const localStorageMock = (() => {
		let store: Record<string, string> = {};

		return {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => {
				store[key] = value.toString();
			},
			removeItem: (key: string) => {
				delete store[key];
			},
			clear: () => {
				store = {};
			},
			key: (index: number) => {
				const keys = Object.keys(store);
				return keys[index] || null;
			},
			get length() {
				return Object.keys(store).length;
			},
		};
	})();

	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock,
		writable: true,
	});

	// Mock sessionStorage
	const sessionStorageMock = (() => {
		let store: Record<string, string> = {};

		return {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => {
				store[key] = value.toString();
			},
			removeItem: (key: string) => {
				delete store[key];
			},
			clear: () => {
				store = {};
			},
			key: (index: number) => {
				const keys = Object.keys(store);
				return keys[index] || null;
			},
			get length() {
				return Object.keys(store).length;
			},
		};
	})();

	Object.defineProperty(window, 'sessionStorage', {
		value: sessionStorageMock,
		writable: true,
	});

	// Mock window.matchMedia
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
}

// Cleanup after each test
afterEach(() => {
	cleanup();
	if (typeof window !== 'undefined') {
		if (window.localStorage) {
			window.localStorage.clear();
		}
		if (window.sessionStorage) {
			window.sessionStorage.clear();
		}
	}
});

// Mock performance API
const mockPerformanceEntries: PerformanceEntry[] = [];
global.performance = {
	...global.performance,
	getEntriesByType: vi.fn((type: string) => {
		if (type === 'navigation') {
			return [
				{
					type: 'navigate',
					entryType: 'navigation',
					name: '',
					startTime: 0,
					duration: 0,
					toJSON: vi.fn(),
				} as unknown as PerformanceNavigationTiming,
			];
		}
		return mockPerformanceEntries;
	}),
} as unknown as Performance;

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	// constructor() {}
	observe() {
		return null;
	}
	disconnect() {
		return null;
	}
	unobserve() {
		return null;
	}
} as unknown as typeof IntersectionObserver;

// Mock AudioContext
class MockAudioContext {
	state = 'running';
	destination = {} as AudioDestinationNode;
	sampleRate = 44100;
	currentTime = 0;
	audioWorklet = {} as AudioWorklet;
	baseLatency = 0;
	outputLatency = 0;

	private mockOscillator = {
		type: 'sine',
		frequency: { value: 0 },
		start: vi.fn(),
		stop: vi.fn(),
		connect: vi.fn(),
		disconnect: vi.fn(),
	} as unknown as OscillatorNode;

	suspend = vi.fn().mockResolvedValue(undefined);
	resume = vi.fn().mockResolvedValue(undefined);
	close = vi.fn().mockResolvedValue(undefined);
	addEventListener = vi.fn();
	removeEventListener = vi.fn();
	dispatchEvent = vi.fn().mockReturnValue(true);
	createAnalyser = vi.fn().mockReturnValue({} as AnalyserNode);
	createBiquadFilter = vi.fn().mockReturnValue({} as BiquadFilterNode);
	createBuffer = vi.fn().mockReturnValue({} as AudioBuffer);
	createBufferSource = vi.fn().mockReturnValue({} as AudioBufferSourceNode);
	createChannelMerger = vi.fn().mockReturnValue({} as ChannelMergerNode);
	createChannelSplitter = vi.fn().mockReturnValue({} as ChannelSplitterNode);
	createConstantSource = vi.fn().mockReturnValue({} as ConstantSourceNode);
	createConvolver = vi.fn().mockReturnValue({} as ConvolverNode);
	createDelay = vi.fn().mockReturnValue({} as DelayNode);
	createDynamicsCompressor = vi.fn().mockReturnValue({} as DynamicsCompressorNode);
	createGain = vi.fn().mockReturnValue({} as GainNode);
	createIIRFilter = vi.fn().mockReturnValue({} as IIRFilterNode);
	createOscillator = vi.fn().mockReturnValue(this.mockOscillator);
	createPanner = vi.fn().mockReturnValue({} as PannerNode);
	createPeriodicWave = vi.fn().mockReturnValue({} as PeriodicWave);
	createScriptProcessor = vi.fn().mockReturnValue({} as ScriptProcessorNode);
	createStereoPanner = vi.fn().mockReturnValue({} as StereoPannerNode);
	createWaveShaper = vi.fn().mockReturnValue({} as WaveShaperNode);
	decodeAudioData = vi.fn().mockResolvedValue({} as AudioBuffer);
}

global.AudioContext = MockAudioContext as unknown as typeof AudioContext;
