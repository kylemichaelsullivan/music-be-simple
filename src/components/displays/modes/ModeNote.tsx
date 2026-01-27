import { memo } from 'react';

type ModeNoteProps = {
	note: string;
};

const ModeNoteComponent = ({ note }: ModeNoteProps) => {
	return <div className='ModeNote col-span-2'>{note}</div>;
};

const ModeNote = memo(ModeNoteComponent);

export { ModeNote };
