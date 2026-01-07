import { ActionIcon } from '@/components/icons';
import IconButton from './IconButton';

type AddButtonProps = {
	onFxn: () => void;
	title?: string;
};

export default function AddButton({ title = 'Add', onFxn }: AddButtonProps) {
	return (
		<IconButton className='AddButton border rounded-full p-2 mx-auto' title={title} onFxn={onFxn}>
			<ActionIcon name='add' size='xs' />
		</IconButton>
	);
}
