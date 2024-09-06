import { browser } from '$app/environment';
import { PUBLIC_BE_URL } from '$env/static/public';
import { io, Socket } from 'socket.io-client';
import { writable } from 'svelte/store';

export const socket = writable<Socket | null>(null);

if (browser) {
	const socketInstance = io({
		host: PUBLIC_BE_URL,
		withCredentials: true
	});

	socket.set(socketInstance);
}

export const disconnectSocket = () => {
	socket.update((s) => {
		if (s) s.disconnect();
		return null;
	});
};

export const connectSocket = () => {
	socket.update((s) => {
		if (s) s.connect();
		return s;
	});
};
