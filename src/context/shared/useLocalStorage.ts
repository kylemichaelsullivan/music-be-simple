import { useCallback, useState } from 'react';
import type { z } from 'zod';

function isUpdater<T>(v: T | ((prev: T) => T)): v is (prev: T) => T {
	return typeof v === 'function';
}

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
			const parsed = JSON.parse(item);
			const validated = schema.parse(parsed);
			return validated;
		} catch (error) {
			console.error(`Failed to parse or validate localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			setStoredValue((prev) => {
				const newValue = isUpdater(value) ? value(prev) : value;
				try {
					const validated = schema.parse(newValue);
					localStorage.setItem(key, JSON.stringify(validated));
					return validated;
				} catch (error) {
					console.error(`Failed to validate or save localStorage key "${key}":`, error);
					return prev;
				}
			});
		},
		[key, schema]
	);

	return [storedValue, setValue];
};
