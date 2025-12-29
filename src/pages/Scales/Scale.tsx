import Tonic from './Tonic';
import Variant from './Variant';

export default function Scale() {
	return (
		<div className='Scale flex justify-center gap-1 w-full'>
			<Tonic />
			<Variant />
		</div>
	);
}
