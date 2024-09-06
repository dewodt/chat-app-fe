import { api } from '$lib/api';
import type { ErrorResponseDto, SuccessPaginatedResponseDto, User } from '$types';
import type { AxiosError } from 'axios';

export interface FindUserRequestQuery {
	username: string;
	page: number;
	limit: number;
}

export type FindUserSuccessResponseBody = SuccessPaginatedResponseDto<User>;

export type FindUserError = AxiosError<ErrorResponseDto>;

export async function findUserService(
	query: FindUserRequestQuery
): Promise<FindUserSuccessResponseBody> {
	const response = await api.get<FindUserSuccessResponseBody>('/users', {
		params: query
	});
	return response.data;
}
