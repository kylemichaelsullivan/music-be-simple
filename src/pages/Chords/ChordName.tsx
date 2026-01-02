import { memo } from 'react';

type ChordNameProps = {
	chordName: string;
};

const ChordName = memo(function ChordName({ chordName }: ChordNameProps) {
	const parts = chordName.split(/([♭♯]|\d+)/).filter(Boolean);

	return (
		<div className='ChordName col-span-2 border-r border-black font-bold text-md text-center sm:text-lg'>
			{parts.map((part, index) => {
				const key = `chord-name-part-${part}-${index}`;
				if (part === '♭') {
					return (
						<span key={key} className='useFlat'>
							{part}
						</span>
					);
				}
				if (part === '♯') {
					return (
						<span key={key} className='useSharp'>
							{part}
						</span>
					);
				}
				if (/^\d+$/.test(part)) {
					return (
						<span key={key} className='number'>
							{part}
						</span>
					);
				}
				return <span key={key}>{part}</span>;
			})}
		</div>
	);
});

export default ChordName;
