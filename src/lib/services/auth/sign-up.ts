import { api } from '$lib/api';
import type { signUpFormSchema } from '$lib/schema';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export type SignUpFormFields = keyof SignUpRequestBody;

export type SignUpRequestBody = z.infer<typeof signUpFormSchema>;

export type SignUpSuccessResponse = SuccessResponseDto<null>;

export type SignUpErrorResponse = AxiosError<ErrorResponseDto>;

export async function signUpService(body: SignUpRequestBody): Promise<SignUpSuccessResponse> {
	const response = await api.post<SignUpSuccessResponse>('/auth/sign-up', body);
	return response.data;
}
