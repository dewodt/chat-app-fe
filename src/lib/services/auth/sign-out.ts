import { api } from '$lib/api';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';

export type SignOutSuccessResponse = SuccessResponseDto<null>;

export type SignOutErrorResponse = AxiosError<ErrorResponseDto>;

export async function signOutService(): Promise<SignOutSuccessResponse> {
	const response = await api.get<SignOutSuccessResponse>('/auth/sign-out');
	return response.data;
}
