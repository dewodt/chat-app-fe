import { api } from '$lib/utils/api';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';

export type SignOutSuccessResponseBody = SuccessResponseDto<null>;

export type SignOutError = AxiosError<ErrorResponseDto>;

export async function signOutService(): Promise<SignOutSuccessResponseBody> {
	const response = await api.get<SignOutSuccessResponseBody>('/auth/sign-out');
	return response.data;
}
