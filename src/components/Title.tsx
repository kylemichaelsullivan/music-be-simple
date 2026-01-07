import { NavIcon } from '@/components/icons';
import type { TabType } from '@/types';

type TitleProps = {
	title: TabType;
};

export default function Title({ title }: TitleProps) {
	return (
		<h1 className='Title flex justify-center items-center gap-2 text-2xl font-bold text-center'>
			<NavIcon name={title} />
			{title}
		</h1>
	);
}
