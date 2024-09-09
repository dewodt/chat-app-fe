import { api } from '$lib/api';
import type { ErrorResponseDto, Message, SuccessPaginatedResponseDto } from '$types';
import type { PaginateQuery } from '$types/request';
import type { AxiosError } from 'axios';

export type GetChatMessageRequestQuery = PaginateQuery;

export type GetChatMessageSuccessResponseBody = SuccessPaginatedResponseDto<Message>;

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
