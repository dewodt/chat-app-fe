import { api } from '$lib/api';
import type { ErrorResponseDto, SuccessResponseDto } from '$types';
import type { AxiosError } from 'axios';

export type UploadAvatarRequestBody = FormData;

export type UploadAvatarSuccessResponseBody = SuccessResponseDto<{
	newAvatarUrl: string;
}>;

export type UploadAvatarError = AxiosError<ErrorResponseDto>;

export async function uploadAvatarService(
	body: UploadAvatarRequestBody
): Promise<UploadAvatarSuccessResponseBody> {
	const response = await api.post<UploadAvatarSuccessResponseBody>('/users/profile-picture', body, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return response.data;
}
