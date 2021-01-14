import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {NgxNotificationService} from 'ngx-notification';

import { SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-managerodcrequests',
  templateUrl: './managerodcrequests.component.html',
  styleUrls: ['./managerodcrequests.component.css']
})
export class ManagerodcrequestsComponent implements OnInit {

  visitorRequests: VisitorRequest[];
  success: boolean;
  public flag: boolean;
  public selectionOptions: SelectionSettingsModel;
  selectedRequests:VisitorRequest[]=[];

  constructor(private userService: UserService, private router: Router,
              private ngxNotificationService: NgxNotificationService) {
  }

  ngOnInit() {
    this.userService.getPendingVisitorRequest(localStorage.getItem('user'))
      .subscribe((data) => {
        this.visitorRequests = data;
        console.log(this.visitorRequests);
        this.visitorRequests.length === 0 ? this.flag = true : this.flag = false;
      }, (error) => {
        console.log(error);
      });
  }

  approve(request: VisitorRequest) {
    request.status = 'Accepted By Manager';
    this.sendNotification('Request Accepted');
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  approveSelected(){
    // request.status = 'Accepted By Manager';
    this.sendNotification('Request Accepted');
    this.userService.approveOrRejectOdcRequestMultiple(this.selectedRequests).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }


  reject(request: VisitorRequest) {
    request.status = 'Rejected By Manager';
    this.sendNotification('Request Rejected ');
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }
  Accept=false;
 
  acceptAll(selected){
    if(selected.target.checked == true){
      this.Accept= true;
    this.selectedRequests = this.visitorRequests;
    console.log(this.selectedRequests)
    }
    else{
    this.Accept= false;
    this.selectedRequests = [];
    console.log(this.selectedRequests)
    }
  }

  Reject=false;
  rejectAll(selected){
    if(selected.target.checked == true){
      this.Reject= true;
    this.selectedRequests = this.visitorRequests;
    console.log(this.selectedRequests)
    }
    else{
    this.Reject= false;
    this.selectedRequests = [];
    console.log(this.selectedRequests)
    }
  }
  selectedForApproval(e,req:VisitorRequest){
    if(e.target.checked == true){
      req.status ='Accepted By Manager';
      this.selectedRequests.push(req);
      console.log(this.selectedRequests)
    }else{
      this.selectedRequests.pop();
      console.log(this.selectedRequests) 
    }
  }

  selectedForRejection(e,req:VisitorRequest){
    if(e.target.checked == true){
      req.status ='Rejected By Manager';
      this.selectedRequests.push(req);
      console.log(this.selectedRequests)
    }else{
      this.selectedRequests.pop();
      console.log(this.selectedRequests) 
    }
  }
}
