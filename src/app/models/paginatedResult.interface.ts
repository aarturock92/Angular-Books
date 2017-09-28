export class PaginatedResult<T>{
    result: T;
    page: number;
    count: number;
    totalPages: number;
    totalCount: number;
}