import Tonic from '@/components/Tonic';
import Variant from '@/components/Variant';
import { useChords } from '@/hooks';

export default function Chord() {
	const { tonic, handleTonicChange } = useChords();

	return (
		<div className='Chord flex justify-center align-center gap-1 w-full mx-auto'>
			<Tonic tonic={tonic} handleTonicChange={handleTonicChange} />
			<Variant type='chord' />
		</div>
	);
}
