import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-managerodcrequests',
  templateUrl: './managerodcrequests.component.html',
  styleUrls: ['./managerodcrequests.component.css']
})
export class ManagerodcrequestsComponent implements OnInit {

  visitorRequests: VisitorRequest[];
  success: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getPendingVisitorRequest(localStorage.getItem('user'))
      .subscribe((data) => {
        this.visitorRequests = data;
        console.log(data);
      }, (error) => console.log(error));
  }

  approve(request: VisitorRequest) {
    request.status = 'Approved';
    this.userService.approveOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  reject(request: VisitorRequest) {
    request.status = 'Rejected';
    this.userService.rejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
