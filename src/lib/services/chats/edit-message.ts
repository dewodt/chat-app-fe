import { emitWithAck } from '$lib/utils/socket-io';
import type { Message, SuccessResponseDto } from '$types';

export interface EditMessageRequestBody {
	messageId: string;
	message: string;
}

export type EditMessageSuccessResponseBody = SuccessResponseDto<Message>;

export type EditMessageError = Error;

export async function editMessageService(
	body: EditMessageRequestBody
): Promise<EditMessageSuccessResponseBody> {
	const response = await emitWithAck<EditMessageSuccessResponseBody>('editMessage', body);
	return response;
}
