import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './component/register/register.component';
import {RaiseodcrequestComponent} from './component/raiseodcrequest/raiseodcrequest.component';
import {ViewuserrequestsComponent} from './component/viewuserrequests/viewuserrequests.component';
import {ManagerodcrequestsComponent} from './component/managerodcrequests/managerodcrequests.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './component/login/login.component';
import {AdminComponent} from './component/admin/admin.component';
import {RegistrationRequestComponent} from './component/registration-request/registration-request.component';
import {ManagerComponent} from './component/manager/manager.component';
import {OdcComponent} from './component/odc/odc.component';
import {EmployeeprofileComponent} from './component/employeeprofile/employeeprofile.component';
import { OdcmanagerComponent } from './odcmanager/odcmanager.component';
import { ViewodcmanagersComponent } from './component/viewodcmanagers/viewodcmanagers.component';
import { OdcmanagerrequestsComponent } from './component/odcmanagerrequests/odcmanagerrequests.component';

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
    OdcComponent,
    EmployeeprofileComponent,
    OdcmanagerComponent,
    ViewodcmanagersComponent,
    OdcmanagerrequestsComponent
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
export class AppModule {
}
