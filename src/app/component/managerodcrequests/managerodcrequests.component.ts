import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitorRequest } from 'src/app/models/VisitorRequest';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-managerodcrequests',
  templateUrl: './managerodcrequests.component.html',
  styleUrls: ['./managerodcrequests.component.css']
})
export class ManagerodcrequestsComponent implements OnInit {

  visitorRequests: VisitorRequest[];
  success: boolean;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getPendingVisitorRequest().subscribe((data) => this.visitorRequests = data);
  }

  approve(request: VisitorRequest) {
    this.userService.approveOdcRequest(request).subscribe((data) => {
      this.success = data;
      console.log(this.success);
      this.router.navigate(['/managerOdcRequests'])
    },
      (error) => console.log(error))
  }
  reject(request: VisitorRequest) {
    this.userService.rejectOdcRequest(request).subscribe((data) => {
      this.success = data;
      console.log(this.success);
      this.router.navigate(['/managerOdcRequests'])
    },
      (error) => console.log(error))
  }

}
