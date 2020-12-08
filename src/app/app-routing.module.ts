import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerodcrequestsComponent } from './component/managerodcrequests/managerodcrequests.component';
import { RaiseodcrequestComponent } from './component/raiseodcrequest/raiseodcrequest.component';
import { RegisterComponent } from './component/register/register.component';
import { ViewuserrequestsComponent } from './component/viewuserrequests/viewuserrequests.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:"login",component:LoginComponent
  },
  {
    path:"register",component:RegisterComponent
  },
  {path:"raiseOdcRequest",component:RaiseodcrequestComponent},
  {path:"viewUserRequest",component:ViewuserrequestsComponent},
  {path:"managerOdcRequests",component:ManagerodcrequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
