import { emit } from '$lib/utils/socket-io';

export interface SendStopTypingRequestBody {
	chatId: string;
}

export async function sendStopTypingService(body: SendStopTypingRequestBody) {
	emit<SendStopTypingRequestBody>('sendStopTyping', body);
}
