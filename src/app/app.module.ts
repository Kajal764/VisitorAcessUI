import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
<<<<<<< HEAD

import { RaiseodcrequestComponent } from './component/raiseodcrequest/raiseodcrequest.component';
import { ViewuserrequestsComponent } from './component/viewuserrequests/viewuserrequests.component';



import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManagerodcrequestsComponent } from './component/managerodcrequests/managerodcrequests.component';
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AdminComponent} from './component/admin/admin.component';
import {RegistrationRequestComponent} from './component/registration-request/registration-request.component';
import { LoginComponent } from './component/login/login.component';
import { ManagerComponent } from './component/manager/manager.component';
>>>>>>> 13fcce9858a0216fb677b5a82398a65601732e6f


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
<<<<<<< HEAD
    RaiseodcrequestComponent,
    ViewuserrequestsComponent,
    LoginComponent,
    ManagerodcrequestsComponent

=======
    LoginComponent,
    AdminComponent,
    RegistrationRequestComponent,
    ManagerComponent
>>>>>>> 13fcce9858a0216fb677b5a82398a65601732e6f
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
