import type { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
		<DndProvider backend={HTML5Backend}>
			<GlobalsContextProvider>
				<TuningsContextProvider>
					<ScalesContextProvider>
						<ChordsContextProvider>
							<PlayContextProvider>{children}</PlayContextProvider>
						</ChordsContextProvider>
					</ScalesContextProvider>
				</TuningsContextProvider>
			</GlobalsContextProvider>
		</DndProvider>
	);
}
