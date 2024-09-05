import { api } from '$lib/api';
import type { ErrorResponseDto, Session, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';

export type GetSessionSuccessResponseBody = SuccessResponseDto<Session>;

export type GetSessionError = AxiosError<ErrorResponseDto>;

export async function getSessionService(): Promise<GetSessionSuccessResponseBody> {
	const response = await api.get<GetSessionSuccessResponseBody>('/auth/session');
	return response.data;
}
