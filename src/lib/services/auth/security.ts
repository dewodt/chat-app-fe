import { api } from '$lib/api';
import type { securitySchema } from '$lib/schema';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export type SecurityFormFields = keyof SecurityRequestBody;

export type SecurityRequestBody = z.infer<typeof securitySchema>;

export type SecuritySuccessResponse = SuccessResponseDto<null>;

export type SecurityErrorResponse = AxiosError<ErrorResponseDto>;

export async function securityService(body: SecurityRequestBody): Promise<SecuritySuccessResponse> {
	const response = await api.patch<SecuritySuccessResponse>('/auth/security', body);
	return response.data;
}
