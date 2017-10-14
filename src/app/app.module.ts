import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ModalModule } from 'ngx-bootstrap'
import { PaginationModule  } from 'ngx-bootstrap/ng2-bootstrap'

import { UserListComponent, UserFormComponent } from './components/user/index'
// Services
import { UserService } from './services/index'
import { ConfigService } from './utils/config.service'

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core'

@NgModule({
  declarations: [
    AppComponent,
   
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuQo7t-Rw9b3PhMNhHalith5kaZtSfDR8'
    }),
  ],
  providers: [
    ConfigService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
