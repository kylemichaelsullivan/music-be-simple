import { useGlobals, useScales } from '@/hooks';

export default function Tonic() {
	const { tonic, handleTonicChange } = useScales();
	const { getNote } = useGlobals();

	return (
		<select
			className='Tonic flex-1 min-w-14 rounded-none border border-slate-500 px-1 hover:ring-1'
			value={tonic}
			onChange={(e) => handleTonicChange(+e.target.value)}
		>
			{Array.from({ length: 12 }, (_, index) => {
				const tonicOption = getNote(index);
				return (
					<option key={tonicOption} value={index}>
						{tonicOption}
					</option>
				);
			})}
		</select>
	);
}
