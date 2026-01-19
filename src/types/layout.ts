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
	hasModes?: boolean;
	displays?: IconType[];
	onFxn: (icon: IconType) => void;
};

export type PageTopButtonProps = {
	icon: ReactNode;
	title: string;
	onFxn: () => void;
};

export type PageLayoutProps = {
	title: TabType;
	topButton: PageTopButtonProps;
	tonicVariantSlot: ReactNode;
	notesSlot?: ReactNode;
	hasModes?: boolean;
	displaysProps: DisplaysProps;
	afterDisplaysSlot?: ReactNode;
};
