import { api } from '$lib/api';
import type { updateProfileSchema } from '$lib/schema';
import type { ErrorResponseDto, SuccessResponseDto, User } from '$types';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export type UpdateProfileDataFormFields = keyof UpdateProfileDataRequestBody;

export type UpdateProfileDataRequestBody = z.infer<typeof updateProfileSchema>;

export type UpdateProfileDataSuccessResponseBody = SuccessResponseDto<User>;

export type UpdateProfileDataError = AxiosError<ErrorResponseDto>;

export async function updateProfileDataService(
	body: UpdateProfileDataRequestBody
): Promise<UpdateProfileDataSuccessResponseBody> {
	const response = await api.put<UpdateProfileDataSuccessResponseBody>('/users/profile-data', body);
	return response.data;
}
