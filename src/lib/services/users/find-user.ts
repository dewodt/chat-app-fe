import { api } from '$lib/utils/api';
import type {
	CursorPaginationRequestQuery,
	ErrorResponseDto,
	SuccessCursorPaginationResponseDto,
	User
} from '$types';
import type { AxiosError } from 'axios';

export interface FindUserRequestQuery extends CursorPaginationRequestQuery {
	username: string;
}

export type FindUserSuccessResponseBody = SuccessCursorPaginationResponseDto<User>;

export type FindUserError = AxiosError<ErrorResponseDto>;

export async function findUserService(
	query: FindUserRequestQuery
): Promise<FindUserSuccessResponseBody> {
	const response = await api.get<FindUserSuccessResponseBody>('/users', {
		params: query
	});
	return response.data;
}
