import type { TABS } from './navigation';

type ReplaceSpaceWithDash<T extends string> = T extends `${infer Head} ${infer Tail}`
	? `${Head}-${ReplaceSpaceWithDash<Tail>}`
	: T;

export type TabType = (typeof TABS)[number];
export type tabType = Lowercase<ReplaceSpaceWithDash<(typeof TABS)[number]>>;
