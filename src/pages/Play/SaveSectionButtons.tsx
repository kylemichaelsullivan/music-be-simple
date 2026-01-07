import SaveSectionButton from '@/components/buttons/SaveSectionButton';
import type { SaveActionType } from '@/types';

type SaveSectionButtonsProps = {
	saves: { [key: string]: () => void };
	action: SaveActionType;
};

export default function SaveSectionButtons({ saves, action }: SaveSectionButtonsProps) {
	return (
		<div className='SaveSectionButtons flex flex-col gap-2'>
			{Object.entries(saves).map(([label, onFxn]) => (
				<SaveSectionButton label={label} action={action} onFxn={onFxn} key={label} />
			))}
		</div>
	);
}
