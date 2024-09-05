import { writable } from 'svelte/store';

export const selectedChatIdStore = writable<string | null>(null);
