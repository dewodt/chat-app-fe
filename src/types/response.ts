export interface BaseResponseDto {
	message: string;
}

export interface SuccessResponseDto<T> extends BaseResponseDto {
	result: 'success';
	data: T;
}

export interface MetaDto {
	page: number;
	limit: number;
	totalData: number;
	totalPage: number;
}

export interface SuccessPaginatedResponseDto<T> extends SuccessResponseDto<T[]> {
	meta: MetaDto;
}

export interface ErrorFieldDto {
	field: string;
	message: string;
}

export interface ErrorResponseDto extends BaseResponseDto {
	result: 'error';
	errorFields: ErrorFieldDto[] | undefined;
}
