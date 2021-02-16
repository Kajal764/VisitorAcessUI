import {Component, OnInit} from '@angular/core';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {NgxNotificationService} from 'ngx-notification';

@Component({
  selector: 'app-odcmanagerrequests',
  templateUrl: './odcmanagerrequests.component.html',
  styleUrls: ['./odcmanagerrequests.component.css']
})
export class OdcmanagerrequestsComponent implements OnInit {

  odcRequests: VisitorRequest[];
  odcRequestsFiltered: VisitorRequest[];
  showMessage= false;
  odcName: string;
  success: boolean;
  requestsPresent: boolean;
  selectedText:string='Pending Approval';
  public message: any;
  public Accept = false;
  requests: VisitorRequest[] = [];
  public AcceptedByManager = 'Accepted By Manager';

  constructor(private userService: UserService,
              private ngxNotificationService: NgxNotificationService)
               {
  }

  ngOnInit() {
    this.userService.getOdcManagerRequests(localStorage.getItem('user'))
      .subscribe((data) => {
        this.odcRequests = data;
        this.odcRequestsFiltered =data;
        this.odcRequestsFiltered = this.odcRequestsFiltered.filter(f=>f.status===this.selectedText);
        if(this.odcRequestsFiltered.length===0)
        this.showMessage = true;
        this.requestsPresent = true;
        if (this.odcRequests.length === 0) {
          this.requestsPresent = false;
          this.message = 'No Pending Request !!!';
        }
      }, (error) => {
        this.message = error.error.message;
        this.requestsPresent = false;
      });
  }

  approve() {
    this.requests.forEach(value => {
      value.status = 'Approved';
    });
    this.sendNotification('Request Approved');
    this.userService.approveOrRejectOdcRequestMultiple(this.requests).subscribe((data) => {
        this.success = data;
        this.requests = [];
      },
      (error) => console.log(error));
  }

  reject() {
    this.requests.forEach(value => {
      value.status = 'Rejected';
    });
    this.sendNotification('Request Rejected ');
    this.userService.approveOrRejectOdcRequestMultiple(this.requests).subscribe((data) => {
        this.success = data;
        this.requests = [];
      },
      (error) => console.log(error));
  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }

  acceptAll(event) {
    if (event.target.checked === true) {
      this.Accept = true;
      this.requests = this.odcRequests;
      this.requests = this.requests.filter(m => m.status !== 'Approved');
      this.requests = this.requests.filter(m => m.status !== 'Rejected');
    } else {
      this.Accept = false;
      this.requests = [];
    }
  }

  selectedForApproval(event, visitorRequests: VisitorRequest) {
    if (event.target.checked === true) {
      this.requests.push(visitorRequests);
    } else {
      this.requests = this.requests.filter(m => m.visitorRequestId !== visitorRequests.visitorRequestId);
    }
    console.log(this.requests);
  }

  onChangeRequest(event){
    let value = event.target.value;
    if(value === "All"){
      this.showMessage = false;
      this.odcRequestsFiltered = this.odcRequests;
    }
    else{
      this.showMessage = false;
      this.odcRequestsFiltered = this.odcRequests.filter(f=>f.status===value);
    }
    if(this.odcRequestsFiltered.length === 0){
      this.showMessage  = true;
    }
  }
}
