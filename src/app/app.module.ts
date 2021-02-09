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
import {ViewodcmanagersComponent} from './component/viewodcmanagers/viewodcmanagers.component';
import {OdcmanagerrequestsComponent} from './component/odcmanagerrequests/odcmanagerrequests.component';
import {AdminNavbarComponent} from './component/admin-navbar/admin-navbar.component';
import {Time24to12Format} from './component/time24to12.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationPopupComponent} from './component/confirmation-popup/confirmation-popup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxNotificationComponent} from 'ngx-notification';
import {GridModule} from '@syncfusion/ej2-angular-grids';

import {OdcmanagerComponent} from './component/odcmanager/odcmanager.component';
import {AssetRequestsComponent} from './component/asset-requests/asset-requests.component';
import {AssetmanagementnavComponent} from './assetmanagementnav/assetmanagementnav.component';
import {CommonpageComponent} from './commonpage/commonpage.component';
import {ViewallassetsComponent} from './component/viewallassets/viewallassets.component';
import {ViewassetlistComponent} from './component/viewassetlist/viewassetlist.component';
import {AssetHistoryComponent} from './asset-history/asset-history.component';
import {AddassetComponent} from './addasset/addasset.component';
import {AuthGuard} from './service/auth.guard';
import {AuthService} from './service/auth.service';
import {LoginService} from './login.service';
import {FilterPipe} from './component/viewassetlist/FilterPipe';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {FilterUser} from './component/admin/FilterUser';


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
    OdcmanagerrequestsComponent,
    AdminNavbarComponent,
    Time24to12Format,
    ConfirmationPopupComponent,
    NgxNotificationComponent,
    AssetRequestsComponent,
    AssetmanagementnavComponent,
    CommonpageComponent,
    ViewallassetsComponent,
    ViewassetlistComponent,
    AssetHistoryComponent,
    AddassetComponent,
    FilterPipe,
    FilterUser
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    GridModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [AuthGuard, AuthService, LoginService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationPopupComponent]
})
export class AppModule {
}
