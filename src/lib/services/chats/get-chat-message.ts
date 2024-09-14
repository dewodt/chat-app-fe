import { api } from '$lib/utils/api';
import type {
	CursorPaginationRequestQuery,
	ErrorResponseDto,
	Message,
	SuccessCursorPaginationResponseDto
} from '$types';
import type { AxiosError } from 'axios';

export type GetChatMessageRequestQuery = CursorPaginationRequestQuery;

export type GetChatMessageSuccessResponseBody = SuccessCursorPaginationResponseDto<Message>;

export type GetChatMessageError = AxiosError<ErrorResponseDto>;

export async function getChatMessageService(
	chatId: string,
	query: GetChatMessageRequestQuery
): Promise<GetChatMessageSuccessResponseBody> {
	const response = await api.get<GetChatMessageSuccessResponseBody>(`/chats/${chatId}/messages`, {
		params: query
	});
	return response.data;
}
