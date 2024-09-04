import { api } from '$lib/api';
import type { signInFormSchema } from '$lib/schema';
import type { ErrorResponseDto, Session, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export type SignInFormFields = keyof SignInRequestBody;

export type SignInRequestBody = z.infer<typeof signInFormSchema>;

export type SignInSuccessResponse = SuccessResponseDto<Session>;

export type SignInErrorResponse = AxiosError<ErrorResponseDto>;

export async function signInService(body: SignInRequestBody): Promise<SignInSuccessResponse> {
	const response = await api.post<SignInSuccessResponse>('/auth/sign-in', body);
	return response.data;
}
