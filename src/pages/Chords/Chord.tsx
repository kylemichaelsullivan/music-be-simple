import { Tonic, Variant } from '@/components';
import { useChords } from '@/hooks';

export function Chord() {
	const { tonic, handleTonicChange } = useChords();

	return (
		<div className='Chord flex justify-center align-center gap-1 w-full mx-auto'>
			<Tonic tonic={tonic} handleTonicChange={handleTonicChange} />
			<Variant type='chord' />
		</div>
	);
}
