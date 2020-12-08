import {Component, OnInit} from '@angular/core';
import {ODCList} from 'src/app/models/ODCList';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-raiseodcrequest',
  templateUrl: './raiseodcrequest.component.html',
  styleUrls: ['./raiseodcrequest.component.css']
})
export class RaiseodcrequestComponent implements OnInit {

  visitorRequest = new VisitorRequest();
  success = false;
  odcs: ODCList[];

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) => this.odcs = data);
  }

  raiseRequest() {
    this.visitorRequest.status = 'Pending Approval';
    this.userService.raiseOdcRequest(this.visitorRequest).subscribe((data) => {
        this.visitorRequest = data;
        this.success = !this.success;
      }, (error) => {
        console.log(error);
      }
    );
  }

  viewOdcRequest() {
    this.router.navigate(['viewUserRequest']);
  }
}
