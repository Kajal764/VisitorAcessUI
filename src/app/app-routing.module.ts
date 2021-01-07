import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManagerodcrequestsComponent} from './component/managerodcrequests/managerodcrequests.component';
import {RaiseodcrequestComponent} from './component/raiseodcrequest/raiseodcrequest.component';
import {RegisterComponent} from './component/register/register.component';
import {ViewuserrequestsComponent} from './component/viewuserrequests/viewuserrequests.component';
import {AdminComponent} from './component/admin/admin.component';
import {RegistrationRequestComponent} from './component/registration-request/registration-request.component';
import {LoginComponent} from './component/login/login.component';
import {ManagerComponent} from './component/manager/manager.component';
import {OdcComponent} from './component/odc/odc.component';
import {EmployeeprofileComponent} from './component/employeeprofile/employeeprofile.component';
import {OdcmanagerComponent} from './odcmanager/odcmanager.component';
import {ViewodcmanagersComponent} from './component/viewodcmanagers/viewodcmanagers.component';
import {OdcmanagerrequestsComponent} from './component/odcmanagerrequests/odcmanagerrequests.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'odcmanager',
    component: OdcmanagerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'raiseOdcRequest',
    component: RaiseodcrequestComponent
  },
  {
    path: 'view-odc-Request',
    component: ViewuserrequestsComponent
  },
  {
    path: 'odc-request',
    component: ManagerodcrequestsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home-admin',
    component: AdminComponent
  },
  {
    path: 'register-request',
    component: RegistrationRequestComponent
  },
  {
    path: 'manager',
    component: ManagerComponent
  },
  {
    path: 'admin-odc',
    component: OdcComponent
  },
  {
    path: 'employee-odc-access',
    component: EmployeeprofileComponent
  },
  {
    path: 'viewOdcManagers/:odcName',
    component: ViewodcmanagersComponent
  },
  {
    path: 'odcManagerRequests',
    component: OdcmanagerrequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
