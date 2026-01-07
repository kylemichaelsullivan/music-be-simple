import type { IconSize, TabType } from '@/types';
import chordsIcon from '/icons/chords.svg';
import playIcon from '/icons/play.svg';
import scalesIcon from '/icons/scales.svg';
import { Icon } from './Icon';

const iconMap: Record<TabType, string> = {
	Chords: chordsIcon,
	Play: playIcon,
	Scales: scalesIcon,
} as const;

type NavIconProps = {
	name: TabType;
	size?: IconSize;
};

export function NavIcon({ name, size = 'sm' }: NavIconProps) {
	return <Icon src={iconMap[name]} alt={name} size={size} className={`${name}Icon`} />;
}
