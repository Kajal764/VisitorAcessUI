import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ODCList} from '../../models/ODCList';
import {ObservedValueOf} from 'rxjs';
import {Router} from '@angular/router';

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
  private odc: ODCList[];
  public flag: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getAllODC()
      .subscribe(data => {
          this.odcList = data;
        },
        error => {
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
      .subscribe(data => {
          this.responseData = data;
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

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
