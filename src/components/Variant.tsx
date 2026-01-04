import { useChords, useGlobals, useScales } from '@/hooks';
import { ChordVariantSchema, ScaleTypeSchema } from '@/schemas';
import type { ChordData, ChordGroup } from '@/types';
import type { Chord_Variant, ScaleType } from '@/types';
import { CHORDS, SCALE_TYPES, getChordSymbol } from '@/utils';
import type { ChangeEvent } from 'react';

function ScaleVariant() {
	const { variant, handleVariantChange } = useScales();
	const { capitalizeFirstLetter } = useGlobals();

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const result = ScaleTypeSchema.safeParse(e.target.value);
		if (result.success) {
			handleVariantChange(result.data as ScaleType);
		}
	};

	return (
		<select
			className='Variant flex-auto border border-slate-500 rounded-none min-w-16 min-h-12 px-1 hover:ring-1'
			value={variant}
			name='Scale Variant'
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
		const result = ChordVariantSchema.safeParse(e.target.value);
		if (result.success) {
			handleVariantChange(result.data as Chord_Variant);
		}
	};

	return (
		<select
			className='Variant flex-auto border border-slate-500 rounded-none min-w-16 min-h-12 px-1 hover:ring-1'
			value={variant}
			name='Chord Variant'
			onChange={handleChange}
		>
			{Object.entries(CHORDS).map(([groupName, group]: [string, ChordGroup]) => (
				<optgroup label={groupName} key={groupName}>
					{Object.entries(group).map(([variantKey, info]: [string, ChordData]) => {
						const result = ChordVariantSchema.safeParse(variantKey);
						if (result.success) {
							return (
								<option value={variantKey} key={variantKey}>
									{`${getChordSymbol(result.data as Chord_Variant, showNerdMode)} | ${info.display}`}
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
