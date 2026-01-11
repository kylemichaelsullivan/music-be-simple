import { useCallback, useState } from 'react';
import type { z } from 'zod';

export const useLocalStorage = <T>(
	key: string,
	schema: z.ZodType<T>,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			if (!item) {
				return initialValue;
			}
			let parsed = JSON.parse(item);

			// Migration: Convert old lowercase referenceMode values to capitalized
			if (key === 'referenceMode' && typeof parsed === 'string') {
				if (parsed === 'chords') {
					parsed = 'Chords';
				} else if (parsed === 'scales') {
					parsed = 'Scales';
				}
				// Update localStorage with the migrated value
				if (parsed !== JSON.parse(item)) {
					localStorage.setItem(key, JSON.stringify(parsed));
				}
			}

			const validated = schema.parse(parsed);
			return validated;
		} catch (error) {
			console.error(`Failed to parse or validate localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			try {
				setStoredValue((prev) => {
					const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
					const validated = schema.parse(newValue);
					localStorage.setItem(key, JSON.stringify(validated));
					return validated;
				});
			} catch (error) {
				console.error(`Failed to validate or save localStorage key "${key}":`, error);
			}
		},
		[key, schema]
	);

	return [storedValue, setValue];
};
