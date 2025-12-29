import TransposeButton from '@/components/buttons/TransposeButton';
import Scale from './Scale';

export default function Scales() {
	return (
		<div className='Scales flex justify-between gap-2'>
			<TransposeButton direction='down' />
			<Scale />
			<TransposeButton direction='up' />
		</div>
	);
}
