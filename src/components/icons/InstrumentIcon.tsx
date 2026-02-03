import type { IconName, IconSize } from '@/types';
import banjoIcon from '/icons/banjo.svg';
import guitarIcon from '/icons/guitar.svg';
import pianoIcon from '/icons/keyboard.svg';
import mandolinIcon from '/icons/mandolin.svg';
import modesIcon from '/icons/stand.svg';
import ukuleleIcon from '/icons/ukulele.svg';
import { Icon } from '.';

const iconMap: Record<IconName, string> = {
	Banjo: banjoIcon,
	Guitar: guitarIcon,
	Mandolin: mandolinIcon,
	Modes: modesIcon,
	Piano: pianoIcon,
	Ukulele: ukuleleIcon,
} as const;

type InstrumentIconProps = {
	name: IconName;
	size?: IconSize;
};

export function InstrumentIcon({ name, size = 'md' }: InstrumentIconProps) {
	return <Icon src={iconMap[name]} alt={name} size={size} />;
}
