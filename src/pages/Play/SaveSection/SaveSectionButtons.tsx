import { SaveSectionButton } from '@/components/buttons';
import type { SaveActionType } from '@/types';

type SaveSectionButtonsProps = {
	actions: { [key: string]: () => void };
	action: SaveActionType;
};

export function SaveSectionButtons({ actions, action }: SaveSectionButtonsProps) {
	return (
		<div className='SaveSectionButtons flex flex-col gap-2'>
			{Object.entries(actions).map(([label, onFxn]) => (
				<SaveSectionButton label={label} action={action} onFxn={onFxn} key={label} />
			))}
		</div>
	);
}
