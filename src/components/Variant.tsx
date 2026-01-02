import { useChords, useGlobals, useScales } from '@/hooks';
import type { ChordData, ChordGroup, Chord_Variant, ScaleType } from '@/types';
import { CHORDS, SCALE_TYPES, getChordSymbol } from '@/utils';
import type { ChangeEvent } from 'react';

function isScaleType(value: string): value is ScaleType {
	return SCALE_TYPES.some((scaleType) => scaleType === value);
}

function isChordVariant(value: string): value is Chord_Variant {
	for (const group of Object.values(CHORDS)) {
		if (value in group) {
			return true;
		}
	}
	return false;
}

function ScaleVariant() {
	const { variant, handleVariantChange } = useScales();
	const { capitalizeFirstLetter } = useGlobals();

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		if (isScaleType(e.target.value)) {
			handleVariantChange(e.target.value);
		}
	};

	return (
		<select
			className='Variant flex-auto border border-slate-500 rounded-none min-w-16 min-h-12 px-1 hover:ring-1'
			value={variant}
			onChange={handleChange}
		>
			{SCALE_TYPES.map((variantOption) => (
				<option value={variantOption} key={variantOption}>
					{capitalizeFirstLetter(variantOption)}
				</option>
			))}
		</select>
	);
}

function ChordVariant() {
	const { variant, handleVariantChange, showNerdMode } = useChords();

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		if (isChordVariant(e.target.value)) {
			handleVariantChange(e.target.value);
		}
	};

	return (
		<select
			className='Variant flex-auto border border-slate-500 rounded-none min-w-16 min-h-12 px-1 hover:ring-1'
			value={variant}
			onChange={handleChange}
		>
			{Object.entries(CHORDS).map(([groupName, group]: [string, ChordGroup]) => (
				<optgroup label={groupName} key={groupName}>
					{Object.entries(group).map(([variantKey, info]: [string, ChordData]) => {
						if (isChordVariant(variantKey)) {
							return (
								<option value={variantKey} key={variantKey}>
									{`${getChordSymbol(variantKey, showNerdMode)} | ${info.display}`}
								</option>
							);
						}
						return null;
					})}
				</optgroup>
			))}
		</select>
	);
}

type VariantProps =
	| {
			type: 'scale';
	  }
	| {
			type: 'chord';
	  };

export default function Variant(props: VariantProps) {
	return props.type === 'scale' ? <ScaleVariant /> : <ChordVariant />;
}
