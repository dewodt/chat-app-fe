import { emitWithAck } from '$lib/utils/socket-io';
import type { SuccessResponseDto } from '$types';

export interface ReadChatRequestBody {
	chatId: string;
}

export type ReadChatSuccessResponseBody = SuccessResponseDto<null>;

export type ReadChatError = Error;

export async function readChatService(
	body: ReadChatRequestBody
): Promise<ReadChatSuccessResponseBody> {
	const response = await emitWithAck<ReadChatSuccessResponseBody>('readChat', body);
	return response;
}
