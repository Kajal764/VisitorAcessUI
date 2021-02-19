import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as $ from 'jquery';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-commonpage',
  templateUrl: './commonpage.component.html',
  styleUrls: ['./commonpage.component.css']
})
export class CommonpageComponent implements OnInit {
  role: string;
  isEmployee = false;
  isManager = false;
  isOdcManager = false;
  isAdmin = false;
  public firstName;
  public lastName;
  public empId;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {

    this.firstName = localStorage.getItem('fName');
    this.lastName = localStorage.getItem('lName');
    this.empId = localStorage.getItem('user');
    this.role = localStorage.getItem('role');

    if (this.role === 'Employee') {
      this.isEmployee = true;
    } else if (this.role === 'Manager') {
      this.isManager = true;
    } else if (this.role === 'Odc-Manager') {
      this.isOdcManager = true;
    } else {
      this.isAdmin = true;
    }
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }


  redirectTo() {
    if (this.isEmployee === true || this.isManager === true) {
      this.router.navigate(['/addAsset']);
    } else {
      this.router.navigate(['/viewAssets']);
    }
  }

  redirect() {
    if (this.isAdmin === true) {
      this.router.navigate(['/home-admin']);
    } else if (this.isEmployee === true) {
      this.router.navigate(['/raiseOdcRequest']);
    } else if (this.isManager === true) {
      this.router.navigate(['/odc-request']);
    } else {
      this.router.navigate(['/odcManagerRequests']);
    }

  }

  redirectToListOfEmployee() {
    this.router.navigate(['/home-admin']);
  }

  redirectToAddODC() {
    this.router.navigate(['/admin-odc']);
  }

  redirectToRegistrationRequest() {
    this.router.navigate(['/register-request']);
  }

  redirectToAddEmployee() {
    this.router.navigate(['/register', 'Admin']);
  }

  redirectToViewAllAsset() {
    this.router.navigate(['/viewAssets']);
  }

  redirectToAddAsset() {
    this.router.navigate(['/addAsset']);
  }

  redirectToViewAssetStatus() {
    this.router.navigate(['/viewAssetList']);
  }

  redirectToOdcRequest() {
    this.router.navigate(['/odc-request']);
  }

  redirectToRaisedOdcRequest() {
    this.router.navigate(['/raiseOdcRequest']);
  }

  redirectToViewOdcRequest() {
    this.router.navigate(['/view-odc-Request']);
  }

  redirectToOdcManagerRequest() {
    this.router.navigate(['/odcManagerRequests']);
  }

  redirectToViewAssetRequest() {
    this.router.navigate(['/assetRequests']);
  }

  redirectToWeeklyReport() {
    this.router.navigate(['/weeklyReport']);
  }

  redirectToViewReportList() {
    this.router.navigate(['/viewReportList']);
  }
}
