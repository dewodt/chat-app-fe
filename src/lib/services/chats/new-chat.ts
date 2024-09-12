import { api } from '$lib/utils/api';
import type { ChatInbox, ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';

export type NewChatSuccessResponseBody = SuccessResponseDto<ChatInbox>;

export type NewChatError = AxiosError<ErrorResponseDto>;

export async function newChatService(userId: string): Promise<NewChatSuccessResponseBody> {
	const response = await api.put<NewChatSuccessResponseBody>(`/users/${userId}/chats`);
	return response.data;
}
