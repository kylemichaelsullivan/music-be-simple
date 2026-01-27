import { memo } from 'react';

type ChordNameProps = {
	chordName: string;
};

const ChordName = memo(function ChordName({ chordName }: ChordNameProps) {
	const parts = chordName.split(/([♭♯]|\d+)/).filter(Boolean);

	return (
		<div className='ChordName col-span-2 border-r border-black font-bold text-center'>
			{parts.map((part, index) => {
				const key = `chord-name-part-${part}-${index}`;
				if (part === '♭') {
					return (
						<span className='hasFlat' key={key}>
							{part}
						</span>
					);
				}
				if (part === '♯') {
					return (
						<span className='hasSharp' key={key}>
							{part}
						</span>
					);
				}
				if (/^\d+$/.test(part)) {
					return (
						<span className='number' key={key}>
							{part}
						</span>
					);
				}
				return <span key={key}>{part}</span>;
			})}
		</div>
	);
});

export { ChordName };
