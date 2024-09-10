import type { signUpFormSchema } from '$lib/schemas';
import { api } from '$lib/utils/api';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export type SignUpFormFields = keyof SignUpRequestBody;

export type SignUpRequestBody = z.infer<typeof signUpFormSchema>;

export type SignUpSuccessResponseBody = SuccessResponseDto<null>;

export type SignUpError = AxiosError<ErrorResponseDto>;

export async function signUpService(body: SignUpRequestBody): Promise<SignUpSuccessResponseBody> {
	const response = await api.post<SignUpSuccessResponseBody>('/auth/sign-up', body);
	return response.data;
}
