import { emitWithAck } from '$lib/utils/socket-io';
import type { SuccessResponseDto } from '$types';

export interface JoinChatRoomsRequestBody {
	chatIds: string[];
}

export type JoinChatRoomsSuccessResponseBody = SuccessResponseDto<null>;

export type JoinChatRoomsError = Error;

export async function joinChatRoomsService(
	body: JoinChatRoomsRequestBody
): Promise<JoinChatRoomsSuccessResponseBody> {
	const response = await emitWithAck<JoinChatRoomsSuccessResponseBody>('joinChatRooms', body);
	return response;
}
