import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ODCList} from '../../models/ODCList';
import {Router} from '@angular/router';
import {ConfirmationPopupComponent} from '../confirmation-popup/confirmation-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from 'src/app/service/auth.service';
import {NgxNotificationService} from 'ngx-notification';

@Component({
  selector: 'app-odc',
  templateUrl: './odc.component.html',
  styleUrls: ['./odc.component.css']
})
export class OdcComponent implements OnInit, OnChanges {

  odcName = '';
  private message: any;
  public odcList: ODCList[];
  private responseData: any;
  public flag: boolean;
  private odcId: number;
  isEdit = false;
  public currentOdc: string;
  Store = 'Store';

  constructor(private userService: UserService,
              private router: Router,
              private modalService: NgbModal,
              private auth: AuthService,
              private ngxNotificationService: NgxNotificationService) {
  }

  ngOnInit() {
    this.userService.getAllODC()
      .subscribe(data => {
          this.odcList = data;
        },
        error => {
          this.odcId = 1;
          this.message = error.error.message;
        });
  }

  addOdc() {
    if (this.odcName.length === 0) {
      this.sendNotification('Pleased Enter ODC Name !!!');
      return;
    }
    const data = {
      odcId: 0,
      odcName: this.odcName
    };
    let count = 0;
    this.odcList.forEach(value => {
      if (value.odcName === this.odcName) {
        count = 1;
      }
    });
    if (count === 0) {
      this.odcList.push(data);
    }
    this.odcName = '';
    this.userService.addOdc(data)
      .subscribe(res => {
          this.responseData = res.body;
          this.sendNotification(this.responseData.message);
        },
        error => {
          this.sendNotification(error.error.message);
        });
  }

  deleteOdc(odc: ODCList): void {
    const index = this.odcList.indexOf(odc);
    if (index !== -1) {
      this.odcList.splice(index, 1);
    }
    this.userService.deleteODC(odc.odcName)
      .subscribe(data => {
          this.responseData = data;
        },
        error => {
          this.message = error.error.message;
          this.flag = true;
        });
  }

  view(odcName: string) {
    this.router.navigate(['/viewOdcManagers', odcName]);
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }

  openPopup(odc: ODCList) {
    const ref = this.modalService.open(ConfirmationPopupComponent);
    ref.componentInstance.data = odc.odcName;
    ref.componentInstance.isOdc = true;
    ref.result.then((Yes) => {
        this.deleteOdc(odc);
      },
      (Cancel) => {
      });
  }

  edit(odc: ODCList) {
    this.isEdit = true;
    this.currentOdc = odc.odcName;
  }

  updateOdc(odc: ODCList) {
    this.isEdit = false;
    const data = {
      odcId: odc.odcId,
      odcName: odc.odcName
    };
    this.userService.editOdc(data).subscribe(res => {
        this.responseData = res.body;
        this.sendNotification(this.responseData.message);
      },
      error => {
        this.message = error.error;
        this.sendNotification(error.error.text);
      });
  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userService.getAllODC()
      .subscribe(data => {
          this.odcList = data;
        },
        error => {
          this.odcId = 1;
          this.message = error.error.message;
        });
  }
}
