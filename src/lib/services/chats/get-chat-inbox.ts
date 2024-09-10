import { api } from '$lib/utils/api';
import type { ChatInbox, ErrorResponseDto, SuccessPaginatedResponseDto } from '$types';
import type { AxiosError } from 'axios';

export interface GetChatInboxRequestQuery {
	title: string;
	page: number;
	limit: number;
}

export type GetChatInboxSuccessResponseBody = SuccessPaginatedResponseDto<ChatInbox>;

export type GetChatInboxError = AxiosError<ErrorResponseDto>;

export async function getChatInboxService(
	query: GetChatInboxRequestQuery
): Promise<GetChatInboxSuccessResponseBody> {
	const response = await api.get<GetChatInboxSuccessResponseBody>('/chats/inbox', {
		params: query
	});
	return response.data;
}
