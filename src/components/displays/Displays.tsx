import { SkipLink } from '@/components/SkipLink';
import { InstrumentNotesProvider } from '@/context';
import { useGlobals } from '@/hooks';
import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { InstrumentType, NoteIndex, border } from '@/types';
import { useLocation } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { Banjo, Guitar, Instrument, Mandolin, Modes, Piano, Ukulele } from './';

type DisplaysProps = {
	notes: NoteIndex[];
	tonic: NoteIndex;
	getBorderStyle?: (note: NoteIndex) => border;
	hasModes?: boolean;
	showNerdMode?: boolean;
	showNoteLabels?: boolean;
};

const INSTRUMENTS: Record<InstrumentType, () => ReactElement> = {
	Banjo: () => <Banjo />,
	Guitar: () => <Guitar />,
	Mandolin: () => <Mandolin />,
	Piano: () => <Piano />,
	Ukulele: () => <Ukulele />,
};

export function Displays({
	notes,
	tonic,
	getBorderStyle,
	hasModes = false,
	showNerdMode,
	showNoteLabels = true,
}: DisplaysProps) {
	const { displays } = useGlobals();
	const location = useLocation();
	const isPlayPage = location.pathname === '/play';

	const orderedDisplays = INSTRUMENT_ORDER.filter((instrument) => {
		const iconType = ICON_MAP[instrument];
		return displays.includes(iconType);
	});

	const showModes = hasModes && displays.includes('stand');

	return (
		<InstrumentNotesProvider
			getBorderStyle={getBorderStyle}
			notes={notes}
			showNerdMode={showNerdMode}
			showNoteLabels={showNoteLabels}
			tonic={tonic}
		>
			<div className='Displays flex flex-col gap-8 w-full max-w-screen-2xl mx-auto'>
				{orderedDisplays.map((display, index) => {
					const nextDisplay = orderedDisplays[index + 1];
					const isLastInstrument = !nextDisplay;

					let skipTarget: string | null = null;
					if (nextDisplay) {
						skipTarget = `.${nextDisplay}`;
					} else if (isLastInstrument && isPlayPage) {
						skipTarget = '.ChordBin .InstrumentSelector';
					}

					return (
						<Instrument instrument={display} key={display}>
							{skipTarget && <SkipLink text={`Skip ${display}`} targetSelector={skipTarget} />}
							{INSTRUMENTS[display]()}
						</Instrument>
					);
				})}

				{showModes && <Modes />}
			</div>
		</InstrumentNotesProvider>
	);
}
