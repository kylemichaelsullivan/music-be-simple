import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
	cleanup();
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
