import { ActionIcon } from '@/components/icons';
import { IconButton } from '.';

type ToggleSaveSectionButtonProps = {
	isOpen?: boolean;
	onFxn: () => void;
};

export function ToggleSaveSectionButton({ isOpen = false, onFxn }: ToggleSaveSectionButtonProps) {
	const title = isOpen ? 'Close Save Section' : 'Open Save Section';

	return (
		<IconButton
			className='ToggleSaveSectionButton text-2xl font-bold text-center self-center'
			title={title}
			onFxn={onFxn}
		>
			<ActionIcon name='save' size='md' />
		</IconButton>
	);
}
