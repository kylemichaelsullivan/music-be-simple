import { Tonic } from '@/components/Tonic';
import { Variant } from '@/components/Variant';
import { useScales } from '@/hooks';

export function Scale() {
	const { tonic, handleTonicChange } = useScales();

	return (
		<div className='Scale flex justify-center gap-1 w-full'>
			<Tonic tonic={tonic} handleTonicChange={handleTonicChange} />
			<Variant type='scale' />
		</div>
	);
}
