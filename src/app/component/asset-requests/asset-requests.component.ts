import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxNotificationService} from 'ngx-notification';
import {AssetList} from 'src/app/models/AssetList';
import {AssetService} from 'src/app/service/asset.service';

@Component({
  selector: 'app-asset-requests',
  templateUrl: './asset-requests.component.html',
  styleUrls: ['./asset-requests.component.css']
})
export class AssetRequestsComponent implements OnInit {

  assetRequest: AssetList[];
  public flag: boolean;
  public isPendingRequest: boolean;
  private isAdmin: boolean;
  Accept = false;
  requests: any = [];
  requestsPresent: boolean;
  // message = 'Asset Not Added !!!';
  success: boolean;
  private message: any;

  constructor(private assetService: AssetService, private router: Router,
              private ngxNotificationService: NgxNotificationService) {
  }

  ngOnInit() {
    this.assetService.getPendingAssetRequest(localStorage.getItem('user'))
      .subscribe((data) => {
        this.assetRequest = data;
        this.requestsPresent = true;
        if (this.assetRequest.length === 0) {
          this.requestsPresent = false;
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
    this.assetService.approveOrRejectAssetRequestMultiple(this.requests).subscribe((data) => {
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
    this.assetService.approveOrRejectAssetRequestMultiple(this.requests).subscribe((data) => {
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
      this.requests = this.assetRequest;
      this.requests = this.requests.filter(m => m.status !== 'Approved');
      this.requests = this.requests.filter(m => m.status !== 'Rejected');
    } else {
      this.Accept = false;
      this.requests = [];
    }
  }

  selectedForApproval(event, assetRequests: AssetList) {
    if (event.target.checked === true) {
      this.requests.push(assetRequests);
    } else {
      this.requests = this.requests.filter(m => m.serialNumber !== assetRequests.serialNumber);
      // alert('In else')
    }
    console.log(this.requests);
  }
}
