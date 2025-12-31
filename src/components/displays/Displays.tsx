import Modes from '@/components/displays/modes/Modes';
import { useGlobals } from '@/hooks';
import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { InstrumentType } from '@/types';
import type { ReactElement } from 'react';
import { Banjo, Guitar, Instrument, Mandolin, Piano, Ukulele } from './instruments';

type DisplaysProps = {
	hasModes?: boolean;
};

const INSTRUMENTS: Record<InstrumentType, () => ReactElement> = {
	Banjo,
	Guitar,
	Mandolin,
	Piano,
	Ukulele,
};

export default function Displays({ hasModes = false }: DisplaysProps) {
	const { displays } = useGlobals();

	const orderedDisplays = INSTRUMENT_ORDER.filter((instrument) => {
		const iconType = ICON_MAP[instrument];
		return displays.includes(iconType);
	});

	const showModes = hasModes && displays.includes('stand');

	return (
		<div className='Displays flex flex-col gap-8 w-full max-w-screen-2xl mx-auto'>
			{orderedDisplays.map((display) => (
				<Instrument instrument={display} key={display}>
					{INSTRUMENTS[display]()}
				</Instrument>
			))}

			{showModes && <Modes />}
		</div>
	);
}
