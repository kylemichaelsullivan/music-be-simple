import type { IconSize } from '@/types';
import clsx from 'clsx';

const sizeClasses: Record<IconSize, string> = {
	xs: 'w-3 h-3 sm:w-4 sm:h-4',
	sm: 'w-4 h-4 sm:w-6 sm:h-6',
	md: 'w-6 h-6 sm:w-8 sm:h-8',
	lg: 'w-8 h-8 sm:w-10 sm:h-10',
};

type IconProps = {
	src: string;
	alt: string;
	size?: IconSize;
	className?: string;
};

export function Icon({ src, alt, size = 'md', className }: IconProps) {
	return <img src={src} alt={alt} className={clsx('Icon', sizeClasses[size], className)} />;
}
