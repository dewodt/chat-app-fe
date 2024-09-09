import type { Chat } from '$types';
import { writable } from 'svelte/store';

export const selectedChatStore = writable<Chat | null>(null);

export function openChat(chat: Chat) {
	selectedChatStore.set(chat);
}

export function closeChat() {
	selectedChatStore.set(null);
}
