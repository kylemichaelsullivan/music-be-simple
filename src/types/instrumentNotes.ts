import type { NoteIndex, border } from '@/types';

export type InstrumentNotesContextType = {
	tonic: NoteIndex;
	notes: NoteIndex[];
	getBorderStyle?: (note: NoteIndex) => border;
	showNerdMode?: boolean;
	showNoteLabels?: boolean;
};
