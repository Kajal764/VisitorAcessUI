import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './component/register/register.component';
import {AdminComponent} from './component/admin/admin.component';
import {RegistrationRequestComponent} from './component/registration-request/registration-request.component';
import {LoginComponent} from './component/login/login.component';


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
    path: 'home-admin',
    component: AdminComponent
  },
  {
    path: 'register-request',
    component: RegistrationRequestComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
