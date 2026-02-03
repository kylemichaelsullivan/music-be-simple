import { TransposeButton } from '@/components/buttons';
import { Scale } from '.';

export function ScaleContainer() {
	return (
		<div className='ScaleContainer flex flex-col gap-2 w-full min-w-0 sm:flex-row sm:justify-between sm:items-center'>
			<div className='flex shrink-0 justify-center gap-2 sm:contents'>
				<TransposeButton direction='down' />
				<span className='inline-flex shrink-0 sm:order-2'>
					<TransposeButton direction='up' />
				</span>
			</div>
			<div className='w-full min-w-0 sm:order-1'>
				<Scale />
			</div>
		</div>
	);
}
