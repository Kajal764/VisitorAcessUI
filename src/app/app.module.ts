import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { RaiseodcrequestComponent } from './component/raiseodcrequest/raiseodcrequest.component';
import { ViewuserrequestsComponent } from './component/viewuserrequests/viewuserrequests.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManagerodcrequestsComponent } from './component/managerodcrequests/managerodcrequests.component';
import {AdminComponent} from './component/admin/admin.component';
import {RegistrationRequestComponent} from './component/registration-request/registration-request.component';
import { ManagerComponent } from './component/manager/manager.component';
import {  AdminprofileComponent  } from "./component/adminprofile/adminprofile.component";
import { ManagerprofileComponent } from "./component/managerprofile/managerprofile.component";
import { EmployeeprofileComponent } from './component/employeeprofile/employeeprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RaiseodcrequestComponent,
    ViewuserrequestsComponent,
    LoginComponent,
    ManagerodcrequestsComponent,
    AdminComponent,
    RegistrationRequestComponent,
    ManagerComponent,
    AdminprofileComponent,
    ManagerprofileComponent,
    EmployeeprofileComponent
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
