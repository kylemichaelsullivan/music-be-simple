import { PageLayout } from '@/components/PageLayout';
import { Tonic } from '@/components/Tonic';
import { Variant } from '@/components/Variant';
import { NavIcon } from '@/components/icons';
import { useChords, usePlay, useScales } from '@/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChordBinDragPreview, PlayBottomSection } from '.';

export function Play() {
	const { referenceMode, toggleReferenceMode } = usePlay();
	const chordsData = useChords();
	const scalesData = useScales();

	const isScalesMode = referenceMode === 'Scales';
	const data = isScalesMode ? scalesData : chordsData;
	const hasModes = isScalesMode;

	const displaysProps = {
		notes: data.notes,
		tonic: data.tonic,
		getBorderStyle: isScalesMode ? undefined : chordsData.getBorderStyle,
		showModes: isScalesMode ? (scalesData.showModes ?? true) : scalesData.showModes,
		isPlayPage: true,
		showNerdMode: isScalesMode ? undefined : chordsData.showNerdMode,
		showNoteLabels: isScalesMode ? scalesData.showNoteLabels : undefined,
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<ChordBinDragPreview />
			<PageLayout
				title='Play'
				topButton={{
					icon: <NavIcon name={referenceMode} size='sm' />,
					title: isScalesMode ? 'Show Chords?' : 'Show Scales?',
					onFxn: toggleReferenceMode,
				}}
				tonicVariantSlot={
					<div
						className={`${isScalesMode ? 'Scale' : 'Chord'} flex justify-center ${isScalesMode ? '' : 'align-center'} gap-1 w-full ${isScalesMode ? '' : 'mx-auto'}`}
					>
						<Tonic tonic={data.tonic} handleTonicChange={data.handleTonicChange} />
						<Variant type={isScalesMode ? 'scale' : 'chord'} />
					</div>
				}
				hasModes={hasModes}
				displaysProps={displaysProps}
				afterDisplaysSlot={<PlayBottomSection />}
			/>
		</DndProvider>
	);
}
