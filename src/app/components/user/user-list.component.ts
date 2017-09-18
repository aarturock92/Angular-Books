import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { IUser  } from '../../models/user.interface'

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{
    
    public Users:IUser[];

    constructor(private userService:UserService){}

    ngOnInit(){
        this.Users = [
            {
                ID: 1,
                Name: "Arturo",
                FirstName: "López",
                SecondName: "Vásquez",
                IdRole: 1,
                User: "aarturock92",
                Password: "****"
            }
        ]
    }


}