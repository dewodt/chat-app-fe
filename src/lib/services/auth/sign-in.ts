import { api } from '$lib/api';
import type { signInFormSchema } from '$lib/schemas';
import type { ErrorResponseDto, Session, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export type SignInFormFields = keyof SignInRequestBody;

export type SignInRequestBody = z.infer<typeof signInFormSchema>;

export type SignInSuccessResponseBody = SuccessResponseDto<Session>;

export type SignInError = AxiosError<ErrorResponseDto>;

export async function signInService(body: SignInRequestBody): Promise<SignInSuccessResponseBody> {
	const response = await api.post<SignInSuccessResponseBody>('/auth/sign-in', body);
	return response.data;
}
