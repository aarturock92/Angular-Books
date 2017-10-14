import { Component, OnInit, TemplateRef } from '@angular/core'
import { UserService } from '../../services/user.service'
import { IUser, PaginatedResult  } from '../../models/index'
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class'


@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{
    
    public Users:IUser[];
    public rows:Array<any> = [];
    public columns:Array<any> = [
      { title: 'Name', name: 'Name'},
      { title: 'User', name: 'User' },
      { title: 'Eliminar', name: '_id'}
    ];
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number;
    public isFirstLoad: boolean = true;
    public isResponseService: boolean = false;
  
    public config:any = {
      paging: true,
      sorting: {columns: this.columns},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered']
    };
  
    private data:Array<any>;
    public modalRef: BsModalRef;

  
    public constructor(private userService: UserService,
                       private modalService: BsModalService) {
    }
  
    public ngOnInit():void {
      this.loadUsers();          
    }

    public loadUsers(){
        
        return this.userService.paginateUsers(this.page, this.itemsPerPage)
            .subscribe((res: PaginatedResult<IUser[]>) => {
                this.rows = res.result;
                this.length = res.total;
                this.page = res.page;
                this.numPages = res.pages;
                this.onChangeTable(this.config);        
                this.isFirstLoad = false;
            })
    }
  
    public changePage(page:any, isResponseService: boolean) {

        this.page = page.page;

        if(!isResponseService){
          this.loadUsers();
        }
    }

    public changeItemPerPage(itemsPerPage: number){
      this.itemsPerPage = itemsPerPage;
      this.loadUsers();
    }

    public openModal(template: TemplateRef<any>){
      this.modalRef = this.modalService.show(template);
    }
   
    public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}, isResponseService:boolean = true):any {
      this.changePage(page, isResponseService);
    }
  
    public onCellClick(data: any): any {
      console.log(data);
    }
}

