import { InstrumentNotesProvider } from '@/context';
import { useGlobals } from '@/hooks';
import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { InstrumentType, NoteIndex, border } from '@/types';
import type { ReactElement } from 'react';
import { Banjo, Guitar, Instrument, Mandolin, Modes, Piano, Ukulele } from './';

type DisplaysProps = {
	hasModes?: boolean;
	notes: NoteIndex[];
	tonic: NoteIndex;
	showNoteLabels?: boolean;
	getBorderStyle?: (note: NoteIndex) => border;
	showNerdMode?: boolean;
};

const INSTRUMENTS: Record<InstrumentType, () => ReactElement> = {
	Banjo: () => <Banjo />,
	Guitar: () => <Guitar />,
	Mandolin: () => <Mandolin />,
	Piano: () => <Piano />,
	Ukulele: () => <Ukulele />,
};

export function Displays({
	hasModes = false,
	notes,
	tonic,
	showNoteLabels = true,
	getBorderStyle,
	showNerdMode,
}: DisplaysProps) {
	const { displays } = useGlobals();

	const orderedDisplays = INSTRUMENT_ORDER.filter((instrument) => {
		const iconType = ICON_MAP[instrument];
		return displays.includes(iconType);
	});

	const showModes = hasModes && displays.includes('stand');

	return (
		<InstrumentNotesProvider
			notes={notes}
			tonic={tonic}
			showNoteLabels={showNoteLabels}
			getBorderStyle={getBorderStyle}
			showNerdMode={showNerdMode}
		>
			<div className='Displays flex flex-col gap-8 w-full max-w-screen-2xl mx-auto'>
				{orderedDisplays.map((display) => (
					<Instrument instrument={display} key={display}>
						{INSTRUMENTS[display]()}
					</Instrument>
				))}

				{showModes && <Modes />}
			</div>
		</InstrumentNotesProvider>
	);
}
