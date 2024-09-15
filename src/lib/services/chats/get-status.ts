import { emitWithAck } from '$lib/utils/socket-io';
import type { STATUS, SuccessResponseDto } from '$types';

export interface GetStatusRequestBody {
	chatId: string;
}

export interface GetStatusSuccessResponseData {
	chatId: string;
	status: STATUS;
}

export type GetStatusSuccessResponseBody = SuccessResponseDto<GetStatusSuccessResponseData>;

export type GetStatusErrorResponse = Error;

export async function getStatusService(body: GetStatusRequestBody) {
	const response = await emitWithAck<GetStatusSuccessResponseBody>('getStatus', body);
	return response;
}
