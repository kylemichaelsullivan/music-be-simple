import { SkipLink } from '@/components';
import { InstrumentNotesProvider } from '@/context';
import { useGlobals } from '@/hooks';
import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { DisplaysProps, InstrumentType } from '@/types';
import { type ReactElement, memo, useMemo } from 'react';
import { Banjo, CircleOfFifths, Guitar, Instrument, Mandolin, Modes, Piano, Ukulele } from '.';

const INSTRUMENTS: Record<InstrumentType, () => ReactElement> = {
	Banjo: () => <Banjo />,
	Guitar: () => <Guitar />,
	Mandolin: () => <Mandolin />,
	Piano: () => <Piano />,
	Ukulele: () => <Ukulele />,
};

function DisplaysComponent({
	notes,
	tonic,
	getBorderStyle,
	pianoNotes,
	showModes = false,
	showNerdMode,
	showNoteLabels = true,
	isPlayPage = false,
}: DisplaysProps) {
	const { displays } = useGlobals();

	const orderedDisplays = useMemo(
		() =>
			INSTRUMENT_ORDER.filter((instrument) => {
				const iconType = ICON_MAP[instrument];
				return displays.includes(iconType);
			}),
		[displays]
	);

	const getNotesForInstrument = useMemo(
		() =>
			pianoNotes
				? (instrument: InstrumentType) => (instrument === 'Piano' ? pianoNotes : notes)
				: undefined,
		[notes, pianoNotes]
	);

	const renderModes = showModes && displays.includes('stand');
	const renderCircle = showModes && displays.includes('circle');

	return (
		<InstrumentNotesProvider
			getBorderStyle={getBorderStyle}
			getNotesForInstrument={getNotesForInstrument}
			notes={notes}
			showNerdMode={showNerdMode}
			showNoteLabels={showNoteLabels}
			tonic={tonic}
		>
			<div className='Displays flex flex-col gap-8 w-full min-w-0 max-w-screen-2xl'>
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

				{renderModes && <Modes />}
				{renderCircle && <CircleOfFifths />}
			</div>
		</InstrumentNotesProvider>
	);
}

export const Displays = memo(DisplaysComponent);
