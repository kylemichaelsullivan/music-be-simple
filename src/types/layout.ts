import type { IconType, NoteIndex, TabType, border } from '@/types';
import type { ReactNode } from 'react';

export type DisplaysProps = {
	notes: NoteIndex[];
	tonic: NoteIndex;
	getBorderStyle?: (note: NoteIndex) => border;
	isPlayPage?: boolean;
	showModes?: boolean;
	showNerdMode?: boolean;
	showNoteLabels?: boolean;
};

export type DisplaysSelectorProps = {
	onFxn: (icon: IconType) => void;
	displays?: IconType[];
	hasModes?: boolean;
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
	hasModes?: boolean;
	notesSlot?: ReactNode;
};
