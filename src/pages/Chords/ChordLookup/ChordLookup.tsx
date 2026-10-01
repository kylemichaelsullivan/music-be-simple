import { memo, useCallback, useMemo, useState } from 'react';
import { SkipLink } from '@/components';
import { useChords, useGlobals } from '@/hooks';
import { NoteIndexSchema } from '@/schemas';
import type { NoteIndex } from '@/types';
import type { ChordLookupMatch } from '@/utils';
import { isValidNoteIndex, lookupChordsFromMask, togglePitchInMask } from '@/utils';
import { ChordLookupPicker } from './ChordLookupPicker';
import { ChordLookupResults } from './ChordLookupResults';

function ChordLookupComponent() {
	const { usingFlats } = useGlobals();
	const { makeScale, tonic, variant } = useChords();
	const [selectionMask, setSelectionMask] = useState(0);

	const matches = useMemo(() => lookupChordsFromMask(selectionMask), [selectionMask]);

	const handleToggle = useCallback((note: NoteIndex) => {
		const result = NoteIndexSchema.safeParse(note);
		if (!result.success || !isValidNoteIndex(result.data)) {
			return;
		}
		setSelectionMask((prev) => togglePitchInMask(prev, result.data));
	}, []);

	const handleClear = useCallback(() => {
		setSelectionMask(0);
	}, []);

	const handleSelect = useCallback(
		(match: ChordLookupMatch) => {
			makeScale(match.tonic, match.variant);
		},
		[makeScale]
	);

	return (
		<section
			className='ChordLookup flex flex-col gap-2 border border-slate-500 bg-slate-200 p-2 shadow-md'
			aria-labelledby='chord-lookup-heading'
		>
			<h2 className='sr-only' id='chord-lookup-heading'>
				Chord lookup
			</h2>
			<SkipLink text='Skip keyboard' targetSelector='.ChordLookupResults' />
			<ChordLookupPicker
				selectionMask={selectionMask}
				usingFlats={usingFlats}
				onToggle={handleToggle}
				onClear={handleClear}
			/>
			<SkipLink text='Skip matches' targetSelector='.DisplaysSelector' />
			<ChordLookupResults
				matches={matches}
				currentTonic={tonic}
				currentVariant={variant}
				onSelect={handleSelect}
			/>
		</section>
	);
}

export const ChordLookup = memo(ChordLookupComponent);
