import { emit } from '$lib/utils/socket-io';

export interface SendTypingRequestBody {
	chatId: string;
}

export interface ReceiveTypingResponseBody {
	chatId: string;
	userId: string;
}

export interface ReceiveStopTypingResponseBody {
	chatId: string;
	userId: string;
}

export function sendTypingService(body: SendTypingRequestBody) {
	emit<SendTypingRequestBody>('sendTyping', body);
}
