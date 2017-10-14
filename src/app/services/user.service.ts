import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IUser, PaginatedResult } from '../models/index'
import { ConfigService } from '../utils/config.service'

@Injectable()
export class UserService{
    _baseUrl: string = '';

    constructor(private http: Http,
                private configService: ConfigService){
        this._baseUrl = configService.getApiURI();
    }

    getUsers(): Observable<IUser[]> {
        return this.http.get(this._baseUrl + 'User')
                        .map((res: Response) => {
                            return res.json();
                        })
    }

    getUserById(idUser: string): Observable<IUser>{
        return this.http.get(this._baseUrl + 'User/'+ idUser)
                        .map((res: Response) => {
                            return res.json();
                        })
    }

    paginateUsers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Array<IUser>>>{
        let paginatedResult: PaginatedResult<Array<IUser>> = new PaginatedResult<Array<IUser>>();

        return this.http.get(this._baseUrl + 'User/Search/' + page + '/' + itemsPerPage)
                        .map((res: Response) => {
                            let data = res.json();
                            paginatedResult.result = data.docs;
                            paginatedResult.total = data.total;
                            paginatedResult.page = data.page;
                            paginatedResult.pages = data.pages;
                            return paginatedResult;
                        })
    }

    createUser(userEntity: IUser): Observable<IUser>{
        return this.http.post(this._baseUrl + 'User', JSON.stringify(userEntity))
                        .map((res: Response) => {
                            return res.json();
                        })
    }

    deleteUser(idUser: string): Observable<void>{
        return this.http.delete(this._baseUrl + 'User/' + idUser)
                        .map((res: Response) => {
                            return;
                        })
    }

    updateUser(idUser: string, userEntity: IUser): Observable<IUser>{
        return this.http.put(this._baseUrl + 'User/' + idUser, JSON.stringify(userEntity))
                        .map((res: Response) => {
                            return res.json();
                        })
    }
   
}