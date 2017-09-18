import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserListComponent, UserFormComponent } from './components/user/index'

// Services
import { UserService } from './services/index'

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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuQo7t-Rw9b3PhMNhHalith5kaZtSfDR8'
    }),
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
