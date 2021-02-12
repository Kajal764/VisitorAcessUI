import {Component, OnInit} from '@angular/core';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-viewuserrequests',
  templateUrl: './viewuserrequests.component.html',
  styleUrls: ['./viewuserrequests.component.css']
})
export class ViewuserrequestsComponent implements OnInit {

  userRequests: VisitorRequest[];
  userRequestsFiltered:VisitorRequest[];
  private empId: string;
  public isEmployee: boolean;
  public listFlag: boolean;
  selectedText:string='Pending Approval';
  showMessage=false;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === 'Employee') {
      this.isEmployee = true;
    } else {
      this.isEmployee = false;
    }
    this.empId = localStorage.getItem('user');
    this.userService.getUserRequest(this.empId)
      .subscribe((data) => {
          this.userRequests = data;
          this.userRequestsFiltered = data;
          this.userRequests.length === 0 ? this.listFlag = false : this.listFlag = true;
        },
        (error) => console.log(error));
  }

  onChangeRequest(event){
    let value = event.target.value;
    if(value === "All"){
      this.showMessage = false;
      this.userRequestsFiltered = this.userRequests;
    }
    else{
      this.showMessage = false;
      this.userRequestsFiltered = this.userRequests.filter(f=>f.status===value);
    }
    if(this.userRequestsFiltered.length === 0){
      this.showMessage  = true;
    }
    

  }

}
