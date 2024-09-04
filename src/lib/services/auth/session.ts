import { api } from '$lib/api';
import type { ErrorResponseDto, Session, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';

export type SessionSuccessResponse = SuccessResponseDto<Session>;

export type SessionErrorResponse = AxiosError<ErrorResponseDto>;

export async function sessionService(): Promise<SessionSuccessResponse> {
	const response = await api.get<SessionSuccessResponse>('/auth/session');
	return response.data;
}
