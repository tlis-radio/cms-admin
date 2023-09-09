export type PaginationDto<TResult> = {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
    results: Array<TResult>;
}