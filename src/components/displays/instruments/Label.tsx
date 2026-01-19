import type { IconName } from '@/types';
import { LabelContent } from './LabelContent';

type LabelProps = {
	icon: IconName;
	title: string;
	onTuningClick?: () => void;
};

export function Label({ icon, title, onTuningClick }: LabelProps) {
	const className = 'Label flex flex-col items-center justify-center gap-2';

	if (onTuningClick != null) {
		return (
			<button
				type='button'
				className={`${className} border-0 bg-transparent p-0`}
				title={title}
				aria-label={`Edit Tuning for ${title}`}
				onClick={onTuningClick}
			>
				<LabelContent icon={icon} title={title} />
			</button>
		);
	}

	return (
		<div className={className} title={title}>
			<LabelContent icon={icon} title={title} />
		</div>
	);
}
