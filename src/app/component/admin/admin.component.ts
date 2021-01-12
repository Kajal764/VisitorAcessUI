import {Component, OnInit, Type} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationPopupComponent} from '../confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private modalService: NgbModal) {
  }

  public userList: User[];
  public message: any;
  private responseData: any;

  ngOnInit() {
    this.getUserList();
  }

  private getUserList() {
    this.userService.getUserList()
      .subscribe(data => {
          this.userList = data;
        },
        error => {
          this.message = error.error.message;
        });
  }

  deleteUser(user: User): void {
    const index = this.userList.indexOf(user);
    if (index !== -1) {
      this.userList.splice(index, 1);
      this.userService.deleteUser(user.empId)
        .subscribe(response => {
          this.responseData = response.body;
        }, (error) => {
          this.responseData = error.error;
        });
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }


  openPopup(user: User) {
    const ref = this.modalService.open(ConfirmationPopupComponent);
    ref.componentInstance.data = user.firstName;
    ref.componentInstance.isOdc = false;
    ref.result.then((Yes) => {
        console.log('yes');
        this.deleteUser(user);
      },
      (Cancel) => {
        console.log('noo');
      });
  }
}



