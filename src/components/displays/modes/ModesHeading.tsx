type ModesHeadingProps = {
	tonicNote: string;
};

function ModesHeading({ tonicNote }: ModesHeadingProps) {
	const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

	return (
		<div className='ModesHeading grid-cols-17 grid bg-slate-400 font-semibold'>
			<div className='col-span-3'>{tonicNote}</div>
			{romanNumerals.map((romanNumeral) => (
				<div className='roman-numeral col-span-2' key={romanNumeral}>
					{romanNumeral}
				</div>
			))}
		</div>
	);
}

export default ModesHeading;
