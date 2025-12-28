import { ICON_MAP } from '@/instruments';
import type { InstrumentType } from '@/types';

type InstrumentProps = {
	instrument: InstrumentType;
	children: React.ReactNode;
};

function Instrument({ instrument, children }: InstrumentProps) {
	const iconName = ICON_MAP[instrument];
	return (
		<div className={`Instrument ${iconName} relative flex min-h-24 w-full justify-center`}>
			{children}
		</div>
	);
}

export default Instrument;
