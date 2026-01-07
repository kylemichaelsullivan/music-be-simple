import type { ActionIconName, IconSize } from '@/types';
import addIcon from '/icons/add.svg';
import downIcon from '/icons/down.svg';
import saveIcon from '/icons/save.svg';
import trashIcon from '/icons/trash.svg';
import upIcon from '/icons/up.svg';
import { Icon } from './Icon';

const actionIconMap: Record<ActionIconName, string> = {
	add: addIcon,
	down: downIcon,
	save: saveIcon,
	trash: trashIcon,
	up: upIcon,
};

const altTextMap: Record<ActionIconName, string> = {
	add: 'Add',
	down: 'Down',
	save: 'Save',
	trash: 'Remove',
	up: 'Up',
} as const;

type ActionIconProps = {
	name: ActionIconName;
	size?: IconSize;
};

export function ActionIcon({ name, size = 'md' }: ActionIconProps) {
	return <Icon src={actionIconMap[name]} alt={altTextMap[name]} size={size} />;
}
