import type { InstrumentType } from '@/types';
import type { ReactNode } from 'react';

type InstrumentProps = {
	instrument: InstrumentType;
	children: ReactNode;
};

export function Instrument({ instrument, children }: InstrumentProps) {
	return (
		<div
			className={`Instrument ${instrument} relative flex flex-col justify-center gap-2 w-full min-h-24`}
		>
			{children}
		</div>
	);
}
