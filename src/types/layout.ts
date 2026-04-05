import type { IconType, NoteIndex, TabType, border } from '@/types';
import type { ReactNode } from 'react';

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
	afterDisplaysSlot?: ReactNode;
	notesSlot?: ReactNode;
};

export type MainBodyProps = Pick<PageLayoutProps, 'displaysProps' | 'afterDisplaysSlot'>;

export type MainHeadProps = Pick<
	PageLayoutProps,
	'title' | 'topButton' | 'tonicVariantSlot' | 'notesSlot'
>;
