import { PUBLIC_BE_URL } from '$env/static/public';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import { io } from 'socket.io-client';

export const socket = io(PUBLIC_BE_URL, {
	autoConnect: false,
	withCredentials: true
});

export function emitWithAck<T extends SuccessResponseDto<any>>(
	eventName: string,
	data: any,
	timeout = 15000
): Promise<T> {
	return new Promise((resolve, reject) => {
		// Emit
		socket.emit(eventName, data, (response: T | ErrorResponseDto) => {
			if (response.result === 'error') {
				// Error
				reject(new Error(response.message));
			} else {
				// Success
				resolve(response);
			}
		});

		setTimeout(() => {
			reject(new Error('Timeout exceeded'));
		}, timeout);
	});
}
