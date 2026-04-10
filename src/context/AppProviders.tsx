import type { ReactNode } from 'react';
import { ChordsContextProvider } from './Chords';
import { GlobalsContextProvider } from './Globals';
import { PlayContextProvider } from './Play';
import { ScalesContextProvider } from './Scales';
import { TuningsContextProvider } from './Tunings';

/**
 * Composes all app-level context providers in the correct order.
 * Dependencies: Globals (none) → Tunings (none) → Scales, Chords (Globals) → Play (Globals, Chords).
 */
export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<GlobalsContextProvider>
			<TuningsContextProvider>
				<ScalesContextProvider>
					<ChordsContextProvider>
						<PlayContextProvider>{children}</PlayContextProvider>
					</ChordsContextProvider>
				</ScalesContextProvider>
			</TuningsContextProvider>
		</GlobalsContextProvider>
	);
}
