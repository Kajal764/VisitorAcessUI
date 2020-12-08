import { Component, OnInit } from '@angular/core';
import { ODCList } from 'src/app/models/ODCList';
import { VisitorRequest } from 'src/app/models/VisitorRequest';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-raiseodcrequest',
  templateUrl: './raiseodcrequest.component.html',
  styleUrls: ['./raiseodcrequest.component.css']
})
export class RaiseodcrequestComponent implements OnInit {

  visitorRequest = new VisitorRequest();
  success: boolean = false;
  odcs: ODCList[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) => this.odcs = data)
  }

  raiseRequest() {
    this.visitorRequest.status = "Pending Approval";
    console.log(JSON.stringify(this.visitorRequest.odc));
    this.userService.raiseOdcRequest(this.visitorRequest).subscribe((data) => {
      this.visitorRequest = data;
      console.log("success");
      this.success = !this.success;
    }, (error) => { console.log(error) }
    );
  }
}
