export interface BasePaginationRequestQuery {
	limit: number;
}

export interface PagePaginationRequestQuery extends BasePaginationRequestQuery {
	page: number;
}

export interface OffsetPaginationRequestQuery extends BasePaginationRequestQuery {
	offset: number;
}

export interface CursorPaginationRequestQuery extends BasePaginationRequestQuery {
	cursor: string | undefined; // null for the first page
}
