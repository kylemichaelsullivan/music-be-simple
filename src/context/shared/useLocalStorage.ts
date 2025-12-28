import { useCallback, useState } from 'react';

export const useLocalStorage = <T>(
	key: string,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			try {
				setStoredValue((prev) => {
					const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
					localStorage.setItem(key, JSON.stringify(newValue));
					return newValue;
				});
			} catch (error) {
				console.error(error);
			}
		},
		[key]
	);

	return [storedValue, setValue];
};
