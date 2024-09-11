import { emitWithAck } from '$lib/utils/socket-io';
import type { Message, SuccessResponseDto } from '$types';

export interface DeleteMessageRequestBody {
	messageId: string;
}

export type DeleteMessageSuccessResponseBody = SuccessResponseDto<Message>;

export type DeleteMessageError = Error;

export async function deleteMessageService(
	body: DeleteMessageRequestBody
): Promise<DeleteMessageSuccessResponseBody> {
	const response = await emitWithAck<DeleteMessageSuccessResponseBody>('deleteMessage', body);
	return response;
}
