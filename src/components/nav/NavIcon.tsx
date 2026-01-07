import type { TabType } from '@/types';
import chordsIcon from '/icons/chords.svg';
import playIcon from '/icons/play.svg';
import scalesIcon from '/icons/scales.svg';

type NavIconProps = {
	name: TabType;
};

export default function NavIcon({ name }: NavIconProps) {
	const iconMap: Record<TabType, string> = {
		Chords: chordsIcon,
		Play: playIcon,
		Scales: scalesIcon,
	};

	return <img src={iconMap[name]} className={`${name}Icon w-4 h-4 sm:w-6 sm:h-6`} alt={name} />;
}
