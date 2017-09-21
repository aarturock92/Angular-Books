import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IUser } from '../models/index'
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
}