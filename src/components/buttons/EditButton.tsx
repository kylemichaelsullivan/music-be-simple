import { ActionIcon } from '@/components/icons';
import { IconButton } from '.';

type EditButtonProps = {
	onFxn: () => void;
	title?: string;
};

export function EditButton({ title = 'Edit', onFxn }: EditButtonProps) {
	return (
		<IconButton className='EditButton absolute top-1 left-1 p-2' title={title} onFxn={onFxn}>
			<ActionIcon name='pen' size='xs' />
		</IconButton>
	);
}
