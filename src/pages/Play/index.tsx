import Main from '@/components/Main';
import Title from '@/components/Title';
// import TopButton from '@/components/TopButton';
import UseFlatsButton from '@/components/buttons/UseFlatsButton';
import Displays from '@/components/displays/Displays';
import DisplaysSelector from '@/components/displays/DisplaysSelector';
import { useGlobals, usePlay } from '@/hooks';
import type { NoteIndex } from '@/types';
import AddChordBinItem from './AddChordBinItem';
import AddNotepadLine from './AddNotepadLine';
import ChordBinItem from './ChordBinItem';
import NotepadLine from './NotepadLine';
import SaveSection from './SaveSection';

export default function PlayIndex() {
	const title = 'Play';
	// Play route doesn't have notes/tonic, so use empty arrays and default tonic
	const notes: NoteIndex[] = [];
	const tonic: NoteIndex = 0;
	const { displays, handleDisplaysClick } = useGlobals();
	const {
		chordBinItems,
		notepadLines,
		addChordBinItem,
		removeChordBinItem,
		addNotepadLine,
		removeNotepadLine,
	} = usePlay();

	return (
		<Main componentName={title}>
			<Title title={title} />
			{
				/* <TopButton title={title} icon='📖' position='left' onFxn={() => {}} /> */
				<UseFlatsButton />
			}

			<DisplaysSelector onFxn={handleDisplaysClick} displays={displays} />
			<Displays notes={notes} tonic={tonic} getBorderStyle={() => 'none'} />

			<div className='ChordBin flex flex-col gap-4 border p-4'>
				<h2 className='text-2xl font-bold text-center'>Chord Bin</h2>
				<div className='ChordBinItems grid grid-cols-3 gap-4 justify-items-center'>
					{chordBinItems.map((id) => (
						<ChordBinItem key={id} id={id} onRemove={() => removeChordBinItem(id)} />
					))}
					<AddChordBinItem onAdd={addChordBinItem} />
				</div>
			</div>

			<div className='Notepad flex flex-col gap-4 border p-4'>
				<h2 className='text-2xl font-bold text-center'>Notepad</h2>
				{notepadLines.map((id) => (
					<NotepadLine onRemove={() => removeNotepadLine(id)} id={id} key={id} />
				))}
				<AddNotepadLine onAdd={addNotepadLine} />
			</div>

			<SaveSection />
		</Main>
	);
}
