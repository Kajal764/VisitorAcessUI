import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ODCList} from '../../models/ODCList';
import {ObservedValueOf} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {ConfirmationPopupComponent} from '../confirmation-popup/confirmation-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-odc',
  templateUrl: './odc.component.html',
  styleUrls: ['./odc.component.css']
})
export class OdcComponent implements OnInit {

  odcName: any;
  private message: any;
  public odcList: ODCList[];
  private responseData: any;
  public flag: boolean;
  private odcId: number;

  constructor(private userService: UserService,
              private router: Router,
              private modalService: NgbModal) {
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
    const data = {
      odcId: 1,
      odcName: this.odcName
    };
    this.odcList.push(data);
    this.odcName = '';
    this.userService.addOdc(data)
      .subscribe(res => {
          this.responseData = res;
        },
        error => {
          this.message = error.error.message;
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
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
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

}
