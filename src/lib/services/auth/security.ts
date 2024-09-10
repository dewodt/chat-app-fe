import type { securitySchema } from '$lib/schemas';
import { api } from '$lib/utils/api';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export type UpdateSecurityFormFields = keyof UpdateSecurityRequestBody;

export type UpdateSecurityRequestBody = z.infer<typeof securitySchema>;

export type UpdateSecuritySuccessResponseBody = SuccessResponseDto<null>;

export type UpdateSecurityError = AxiosError<ErrorResponseDto>;

export async function updateSecurityService(
	body: UpdateSecurityRequestBody
): Promise<UpdateSecuritySuccessResponseBody> {
	const response = await api.patch<UpdateSecuritySuccessResponseBody>('/auth/security', body);
	return response.data;
}
