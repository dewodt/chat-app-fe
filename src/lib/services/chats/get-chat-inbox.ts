import { api } from '$lib/utils/api';
import type {
	ChatInbox,
	CursorPaginationRequestQuery,
	ErrorResponseDto,
	SuccessCursorPaginationResponseDto
} from '$types';
import type { AxiosError } from 'axios';

export interface GetChatInboxRequestQuery extends CursorPaginationRequestQuery {
	title: string;
}

export type GetChatInboxSuccessResponseBody = SuccessCursorPaginationResponseDto<ChatInbox>;

export type GetChatInboxError = AxiosError<ErrorResponseDto>;

export async function getChatInboxService(
	query: GetChatInboxRequestQuery
): Promise<GetChatInboxSuccessResponseBody> {
	const response = await api.get<GetChatInboxSuccessResponseBody>('/chats/inbox', {
		params: query
	});
	return response.data;
}
