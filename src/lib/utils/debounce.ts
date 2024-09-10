import type { Readable } from 'svelte/motion';
import { derived, get, type Writable } from 'svelte/store';

export function debounce<T>(store: Writable<T>, delay: number = 300): Readable<T> {
	return derived(
		store,
		($value, set) => {
			const timeOut = setTimeout(() => set($value), delay);
			return () => clearTimeout(timeOut);
		},
		get(store)
	);
}
