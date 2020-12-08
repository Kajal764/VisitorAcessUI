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

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
    path: 'viewUserRequest',
    component: ViewuserrequestsComponent
  },
  {
    path: 'managerOdcRequests',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
