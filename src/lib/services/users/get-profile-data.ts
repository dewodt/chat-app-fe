import { api } from '$lib/utils/api';
import type { ErrorResponseDto, ProfileData, SuccessResponseDto } from '$types';
import { AxiosError } from 'axios';

export type GetProfileDataSuccessResponseBody = SuccessResponseDto<ProfileData>;

export type GetProfileDataError = AxiosError<ErrorResponseDto>;

export async function getProfileDataService(): Promise<GetProfileDataSuccessResponseBody> {
	const response = await api.get<GetProfileDataSuccessResponseBody>('/users/profile-data');
	return response.data;
}
