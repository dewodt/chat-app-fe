import { api } from '$lib/api';
import type { signInFormSchema, signUpFormSchema } from '$lib/schema';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';
import * as z from 'zod';

/**
 * Sign In
 */
export type SignInFormFields = keyof SignInRequestBody;
export type SignInRequestBody = z.infer<typeof signInFormSchema>;
export interface SignInSuccessResponseData {
	token: string;
	user: {
		id: number;
		username: string;
	};
}
export type SignInSuccessResponse = SuccessResponseDto<SignInSuccessResponseData>;
export type SignInErrorResponse = AxiosError<ErrorResponseDto>;

export async function signInService(body: SignInRequestBody): Promise<SignInSuccessResponse> {
	const response = await api.post<SignInSuccessResponse>('/auth/sign-in', body);
	return response.data;
}

/**
 * Sign Up
 */
export type SignUpRequestBody = z.infer<typeof signUpFormSchema>;
export type SignUpSuccessResponse = SuccessResponseDto<null>;
export type SignUpErrorResponse = AxiosError<ErrorResponseDto>;

export async function signUpService(body: SignUpRequestBody): Promise<SignUpSuccessResponse> {
	const response = await api.post<SignUpSuccessResponse>('/auth/sign-up', body);
	return response.data;
}

/**
 * Sign Out
 */
export type SignOutSuccessResponse = SuccessResponseDto<null>;
export type SignOutErrorResponse = AxiosError<ErrorResponseDto>;

export async function signOutService(): Promise<SignOutSuccessResponse> {
	const response = await api.post<SignOutSuccessResponse>('/auth/sign-out');
	return response.data;
}
