type NotepadLineTextProps = {
	text: string;
	onTextChange: (text: string) => void;
};

export function NotepadLineText({ text, onTextChange }: NotepadLineTextProps) {
	return (
		<input
			type='text'
			className='NotepadLineText border border-slate-500 w-full p-2 hover:ring-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
			value={text}
			placeholder='Line Text'
			aria-label='Line Text'
			onChange={(e) => onTextChange(e.target.value)}
		/>
	);
}
