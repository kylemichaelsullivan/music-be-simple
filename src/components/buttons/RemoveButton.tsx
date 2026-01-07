import { ActionIcon } from '@/components/icons';
import IconButton from './IconButton';

type RemoveButtonProps = {
	onFxn: () => void;
	title?: string;
};

export default function RemoveButton({ title = 'Remove', onFxn }: RemoveButtonProps) {
	return (
		<IconButton className='RemoveButton absolute top-1 right-1 p-2' title={title} onFxn={onFxn}>
			<ActionIcon name='trash' size='xs' />
		</IconButton>
	);
}
