import { useGlobals, usePlay } from '@/hooks';
import { ICON_MAP, INSTRUMENT_ORDER } from '@/instruments';
import type { InstrumentType } from '@/types';
import { useCallback } from 'react';
import { InstrumentButton } from './InstrumentButton';

export function InstrumentSelector() {
	const { displays } = useGlobals();
	const { activeInstrument, setActiveInstrument } = usePlay();

	// Get active displays, excluding Modes (stand), and convert to instruments
	const activeInstruments = INSTRUMENT_ORDER.filter((instrument) => {
		const iconType = ICON_MAP[instrument];
		return displays.includes(iconType);
	});

	const handleInstrumentClick = useCallback(
		(instrument: InstrumentType) => {
			setActiveInstrument(instrument === activeInstrument ? null : instrument);
		},
		[activeInstrument, setActiveInstrument]
	);

	return (
		<div className='InstrumentSelector flex flex-col gap-2 border p-2'>
			<div className='flex flex-wrap gap-2 justify-center'>
				{activeInstruments.map((instrument) => (
					<InstrumentButton
						instrument={instrument}
						isActive={activeInstrument === instrument}
						onClick={handleInstrumentClick}
						key={instrument}
					/>
				))}
			</div>
		</div>
	);
}
