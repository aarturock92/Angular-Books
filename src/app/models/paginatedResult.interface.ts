export class PaginatedResult<T>{
    //Representa la colección de datos 
    result: T;
    total: number;
    limit: number;
    page: number;
    pages:number;
}