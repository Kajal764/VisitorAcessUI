import { Component, OnInit } from '@angular/core';
import { VisitorRequest } from 'src/app/models/VisitorRequest';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-odcmanagerrequests',
  templateUrl: './odcmanagerrequests.component.html',
  styleUrls: ['./odcmanagerrequests.component.css']
})
export class OdcmanagerrequestsComponent implements OnInit {

  odcRequests:VisitorRequest[];
  odcName:string;
  success:boolean;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getOdcManagerRequests("FRB") .subscribe((data) => {
      this.odcRequests = data;
    }, (error) => console.log(error));
  }

  approve(request: VisitorRequest) {
    request.status = 'Approved';
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  reject(request: VisitorRequest) {
    request.status = 'Rejected';
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }
}
