import { InstrumentIcon } from '@/components/icons';
import type { IconName } from '@/types';

type LabelContentProps = {
	icon: IconName;
	title: string;
};

export function LabelContent({ icon, title }: LabelContentProps) {
	return (
		<>
			<InstrumentIcon name={icon} />
			<span className='hidden text-xs font-bold sm:block'>{title}</span>
		</>
	);
}
