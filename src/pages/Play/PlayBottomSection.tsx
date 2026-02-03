import { ChordBin, Notepad, SaveSection } from '.';

export function PlayBottomSection() {
	return (
		<div className='PlayBottomSection flex flex-col gap-4 border-t-8 border-black border-double pt-4'>
			<ChordBin />
			<Notepad />
			<SaveSection />
		</div>
	);
}
