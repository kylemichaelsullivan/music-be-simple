import { TransposeButton } from '@/components/buttons';
import { Scale } from './Scale';

export function ScaleContainer() {
	return (
		<div className='ScaleContainer flex justify-between gap-2'>
			<TransposeButton direction='down' />
			<Scale />
			<TransposeButton direction='up' />
		</div>
	);
}
