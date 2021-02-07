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
import {ViewodcmanagersComponent} from './component/viewodcmanagers/viewodcmanagers.component';
import {OdcmanagerrequestsComponent} from './component/odcmanagerrequests/odcmanagerrequests.component';
import {OdcmanagerComponent} from './component/odcmanager/odcmanager.component';


import {AssetRequestsComponent} from './component/asset-requests/asset-requests.component';
import {AssetmanagementnavComponent} from './assetmanagementnav/assetmanagementnav.component';
import {CommonpageComponent} from './commonpage/commonpage.component';

import {ViewallassetsComponent} from './component/viewallassets/viewallassets.component';
import {ViewassetlistComponent} from './component/viewassetlist/viewassetlist.component';
import {AssetHistoryComponent} from './asset-history/asset-history.component';
import {AddassetComponent} from './addasset/addasset.component';
import {AuthGuard} from './service/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'odcmanager',
    component: OdcmanagerComponent, canActivate: [AuthGuard]
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
    component: RaiseodcrequestComponent, canActivate: [AuthGuard]
  },
  {
    path: 'view-odc-Request',
    component: ViewuserrequestsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'odc-request',
    component: ManagerodcrequestsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home-admin',
    component: AdminComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register-request',
    component: RegistrationRequestComponent, canActivate: [AuthGuard]
  },
  {
    path: 'manager',
    component: ManagerComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-odc',
    component: OdcComponent, canActivate: [AuthGuard]
  },
  {
    path: 'employee-odc-access',
    component: EmployeeprofileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'viewOdcManagers/:odcName',
    component: ViewodcmanagersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'odcManagerRequests',
    component: OdcmanagerrequestsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'assetRequests',
    component: AssetRequestsComponent, canActivate: [AuthGuard]
  },
  
  {
    path: 'assetmanagementnav',
    component: AssetmanagementnavComponent, canActivate: [AuthGuard]
  },
  {
    path: 'commonpage',
    component: CommonpageComponent, canActivate: [AuthGuard]
  },
  // {
  //   path: 'viewassetstatus',
  //   component: ViewassetstatusComponent,canActivate:[ AuthGuard]
  // },

  {
    path: 'viewAssetList',
    component: ViewallassetsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'viewAssets',
    component: ViewassetlistComponent, canActivate: [AuthGuard]
  },
  {
    path: 'asset-history/:value',
    component: AssetHistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'addAsset',
    component: AddassetComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
