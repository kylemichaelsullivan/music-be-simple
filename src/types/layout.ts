import type { ReactNode } from 'react';
import type { border, IconType, NoteIndex, TabType } from '@/types';

export type DisplaysProps = {
	getBorderStyle?: (note: NoteIndex, keyIndex?: number) => border;
	notes: NoteIndex[];
	tonic: NoteIndex;
	pianoNotes?: NoteIndex[];
	hideModesAndCircle?: boolean;
	isPlayPage?: boolean;
	showModes?: boolean;
	showNerdMode?: boolean;
	showNoteLabels?: boolean;
};

export type DisplaysSelectorProps = {
	hideModesAndCircle?: boolean;
	onFxn: (icon: IconType) => void;
	displays?: IconType[];
};

export type PageTopButtonProps = {
	icon: ReactNode;
	title: string;
	onFxn: () => void;
};

export type PageLayoutProps = {
	displaysProps: DisplaysProps;
	title: TabType;
	tonicVariantSlot: ReactNode;
	topButton: PageTopButtonProps;
	titleActionLabel?: string;
	afterDisplaysSlot?: ReactNode;
	notesSlot?: ReactNode;
	titleTooltip?: string /** Shown as the browser tooltip when the title is clickable */;
	onTitleClick?: () => void;
};

export type MainBodyProps = Pick<PageLayoutProps, 'displaysProps' | 'afterDisplaysSlot'>;

export type MainHeadProps = Pick<
	PageLayoutProps,
	| 'onTitleClick'
	| 'title'
	| 'titleActionLabel'
	| 'titleTooltip'
	| 'topButton'
	| 'tonicVariantSlot'
	| 'notesSlot'
>;
