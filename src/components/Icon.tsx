import type { InstrumentType } from '@/types';
import banjoIcon from '/icons/banjo.svg';
import guitarIcon from '/icons/guitar.svg';
import pianoIcon from '/icons/keyboard.svg';
import mandolinIcon from '/icons/mandolin.svg';
import modesIcon from '/icons/stand.svg';
import ukuleleIcon from '/icons/ukulele.svg';

type IconName = InstrumentType | 'Modes';

const iconMap: Record<IconName, string> = {
	Banjo: banjoIcon,
	Guitar: guitarIcon,
	Mandolin: mandolinIcon,
	Modes: modesIcon,
	Piano: pianoIcon,
	Ukulele: ukuleleIcon,
} as const;

type IconProps = {
	name: IconName;
};

export default function Icon({ name }: IconProps) {
	return <img src={iconMap[name]} className='Icon w-6 h-6 sm:w-8 sm:h-8' alt={name} />;
}

export type { IconName };
