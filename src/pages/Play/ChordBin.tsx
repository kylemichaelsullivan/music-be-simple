import ChordBinItems from './ChordBinItems';

export default function ChordBin() {
	return (
		<div className='ChordBin flex flex-col gap-4 border p-4'>
			<h2 className='text-2xl font-bold text-center'>Chord Bin</h2>

			<ChordBinItems />
		</div>
	);
}
