type ModesHeadingProps = {
	tonicNote: string;
};

function ModesHeading({ tonicNote }: ModesHeadingProps) {
	return (
		<div className='ModesHeading grid-cols-17 grid bg-slate-400 font-semibold'>
			<div className='col-span-3'>{tonicNote}</div>
			{Array.from({ length: 7 }, (_, index) => {
				const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
				return (
					<div className='roman-numeral col-span-2' key={romanNumerals[index]}>
						{romanNumerals[index]}
					</div>
				);
			})}
		</div>
	);
}

export default ModesHeading;
