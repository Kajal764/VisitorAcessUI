import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-viewodcmanagers',
  templateUrl: './viewodcmanagers.component.html',
  styleUrls: ['./viewodcmanagers.component.css']
})
export class ViewodcmanagersComponent implements OnInit {

  odcManagers:User[];
  odcName:string;
  constructor(private userService:UserService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.odcName = this.route.snapshot.params.odcName;
    this.userService.getOdcManagers(this.odcName)
    .subscribe((data) => {
        this.odcManagers = data;
      },
      (error) => console.log(error));
  }

}
