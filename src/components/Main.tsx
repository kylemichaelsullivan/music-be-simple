import type { ReactNode } from 'react';

type MainProps = {
	componentName: string;
	children: ReactNode;
};

export default function Main({ componentName, children }: MainProps) {
	return (
		<main
			className={`${componentName} relative flex flex-col gap-4 flex-1 p-4 scroll-snap-align-start`}
		>
			{children}
		</main>
	);
}
