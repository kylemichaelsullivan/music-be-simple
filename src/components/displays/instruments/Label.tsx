import type { IconName } from '@/components/Icon';
import Icon from '@/components/Icon';

interface LabelProps {
	icon: IconName;
	title: string;
}

export default function Label({ icon, title }: LabelProps) {
	return (
		<div className='Label flex flex-col items-center justify-center gap-2' title={title}>
			<Icon name={icon} />
			<span className='hidden text-xs font-bold sm:block'>{title}</span>
		</div>
	);
}
