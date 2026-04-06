import type { border, InstrumentType, NoteIndex } from '@/types';

export type InstrumentNotesContextType = {
	tonic: NoteIndex;
	notes: NoteIndex[];
	getBorderStyle?: (note: NoteIndex, keyIndex?: number) => border;
	getNotesForInstrument?: (instrument: InstrumentType) => NoteIndex[];
	showNerdMode?: boolean;
	showNoteLabels?: boolean;
};
