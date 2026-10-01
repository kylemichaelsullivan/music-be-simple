import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { NoteIndex } from '@/types';
import type { Chord_Variant, ChordLookupMatch } from '@/utils';
import { ChordLookupResult } from './ChordLookupResult';

type ChordLookupResultsProps = {
	matches: ChordLookupMatch[];
	currentTonic: NoteIndex;
	currentVariant: Chord_Variant;
	onSelect: (match: ChordLookupMatch) => void;
};

function ChordLookupResultsComponent({
	matches,
	currentTonic,
	currentVariant,
	onSelect,
}: ChordLookupResultsProps) {
	const listRef = useRef<HTMLUListElement>(null);
	const [canScrollMore, setCanScrollMore] = useState(false);
	const hasMatches = matches.length > 0;

	const updateScrollHint = useCallback(() => {
		const el = listRef.current;
		const next = el ? el.scrollHeight - el.scrollTop - el.clientHeight > 1 : false;
		setCanScrollMore((prev) => (prev === next ? prev : next));
	}, []);

	useEffect(() => {
		const el = listRef.current;
		if (!el) {
			return;
		}

		el.addEventListener('scroll', updateScrollHint, { passive: true });
		const observer = new ResizeObserver(updateScrollHint);
		observer.observe(el);

		return () => {
			el.removeEventListener('scroll', updateScrollHint);
			observer.disconnect();
		};
	}, [updateScrollHint]);

	// Remeasure when list content changes; ResizeObserver won’t see scrollHeight-only growth.
	// biome-ignore lint/correctness/useExhaustiveDependencies: matches drives content height
	useEffect(() => {
		updateScrollHint();
	}, [matches, updateScrollHint]);

	return (
		<div
			className={clsx(
				'ChordLookupResults-wrap relative',
				hasMatches && canScrollMore && 'has-scroll-more'
			)}
		>
			{hasMatches ? (
				<ul
					ref={listRef}
					className='ChordLookupResults flex h-[6.75rem] max-h-[6.75rem] list-none flex-col overflow-y-auto p-0'
				>
					{matches.map((match) => {
						const isCurrent =
							match.tonic === currentTonic &&
							match.variant === currentVariant &&
							match.bass === match.tonic;
						return (
							<li key={`${match.tonic}-${match.variant}`}>
								<ChordLookupResult match={match} isCurrent={isCurrent} onSelect={onSelect} />
							</li>
						);
					})}
				</ul>
			) : (
				<p className='ChordLookupResults flex h-[6.75rem] max-h-[6.75rem] items-center justify-center m-0 px-2 text-center text-sm text-slate-600'>
					Select Notes to Find Chords
				</p>
			)}
		</div>
	);
}

export const ChordLookupResults = memo(ChordLookupResultsComponent);
