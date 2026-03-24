import { useGlobals, useScales } from '@/hooks';
import type { NoteIndex } from '@/types';
import {
	CIRCLE_OF_FIFTHS_ORDER,
	circleInnerKeySignatureLabel,
	getNote,
	intervalShortNameFromTonic,
	keySignatureMajorTonicForVariant,
} from '@/utils';
import { useMemo } from 'react';
import {
	R_INTERVAL_INNER,
	R_INTERVAL_OUTER,
	R_MAJOR_INNER,
	R_MAJOR_OUTER,
	R_MID_INNER,
	R_MID_OUTER,
	VIEW_CENTER,
	annularWedgePath,
	polar,
	segmentAnglesRad,
} from './circleOfFifthsGeometry';
import type { CircleOfFifthsSegment } from './circleOfFifthsTypes';

export function useCircleOfFifthsSegments(): CircleOfFifthsSegment[] {
	const { usingFlats } = useGlobals();
	const { tonic, notes, variant } = useScales();

	const diatonicSet = useMemo(() => new Set(notes), [notes]);

	return useMemo(
		() =>
			CIRCLE_OF_FIFTHS_ORDER.map((majorIndex: NoteIndex, i: number) => {
				const { centerRad, startRad, endRad } = segmentAnglesRad(i);
				const majorLabel = getNote(majorIndex, usingFlats);
				const signatureMajorTonic = keySignatureMajorTonicForVariant(majorIndex, variant);
				const sigLabel = circleInnerKeySignatureLabel(signatureMajorTonic, usingFlats);
				const intervalLabel = intervalShortNameFromTonic(tonic, majorIndex);

				const majorWedgePath = annularWedgePath(
					VIEW_CENTER,
					VIEW_CENTER,
					R_MAJOR_INNER,
					R_MAJOR_OUTER,
					startRad,
					endRad
				);

				const majorLabelPosition = polar(
					VIEW_CENTER,
					VIEW_CENTER,
					(R_MAJOR_INNER + R_MAJOR_OUTER) / 2,
					centerRad
				);
				const intervalLabelPosition = polar(
					VIEW_CENTER,
					VIEW_CENTER,
					(R_MID_INNER + R_MID_OUTER) / 2,
					centerRad
				);
				const sigLabelPosition = polar(
					VIEW_CENTER,
					VIEW_CENTER,
					(R_INTERVAL_INNER + R_INTERVAL_OUTER) / 2,
					centerRad
				);

				const isCurrentTonic = tonic === majorIndex;
				const inSelectedScale = diatonicSet.has(majorIndex);

				return {
					majorIndex,
					majorLabel,
					sigLabel,
					intervalLabel,
					majorWedgePath,
					majorLabelPosition,
					intervalLabelPosition,
					sigLabelPosition,
					isCurrentTonic,
					inSelectedScale,
					wedgeStartRad: startRad,
				};
			}),
		[tonic, usingFlats, diatonicSet, variant]
	);
}
