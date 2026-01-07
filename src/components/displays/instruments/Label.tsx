import { InstrumentIcon } from '@/components/icons';
import type { IconName } from '@/types';

type LabelProps = {
	icon: IconName;
	title: string;
};

export default function Label({ icon, title }: LabelProps) {
	return (
		<div className='Label flex flex-col items-center justify-center gap-2' title={title}>
			<InstrumentIcon name={icon} />
			<span className='hidden text-xs font-bold sm:block'>{title}</span>
		</div>
	);
}
