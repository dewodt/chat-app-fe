import { emitWithAck } from '$lib/utils/socket-io';
import type { Message, SuccessResponseDto } from '$types';

export interface SendMessageRequestBody {
	chatId: string;
	message: string;
}

export type SendMessageSuccessResponseBody = SuccessResponseDto<Message>;

export type SendMessageError = Error;

export async function sendMessageService(
	body: SendMessageRequestBody
): Promise<SendMessageSuccessResponseBody> {
	const response = await emitWithAck<SendMessageSuccessResponseBody>('sendMessage', body);
	return response;
}
